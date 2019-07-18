const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Try block will monitor the await functions. If any errors, it will stop and send user the errors.
    try {
      // Send the email
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      // Save survey in mongo.
      await survey.save();
      // Updated user credits and save updated user account.
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    // console.log(req.body);
    const p = new Path("/api/surveys/:surveyId/:choice");

    // chain is a lodash function that allows us to take an array and tag on multiple functions/steps without the need to break it up so much and assign multiple variables.
    _.chain(req.body)
      .map(({ email, url }) => {
        // Use the URL helper to pull out only the route portion and exclude the domain part.
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      // Compact events will remove undefined events.
      .compact()
      // uniqBy will remove duplicates
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    // This is just required to send back to SendGrid so they know we got the update otherwise they will continue to ping us the same results.
    res.send({});
  });
};
