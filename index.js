const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
// Special package that allows cookies to be used with Express.
const cookieSession = require("cookie-session");
const passport = require("passport");
// Body parser is an express middleware and allows us to parse the token data sent from the Stripe token. This gives us access to req.body.
const bodyParser = require("body-parser");
// We can remove the varible since we do not need to use it, only requiring the file to have the actions run.
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
// This is to generate the cookie session for googleauth.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
});
