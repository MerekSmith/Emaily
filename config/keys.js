// keys.js - Figure out what credentials to return

if (process.env.NODE_ENV === "production") {
  // We are in production - return the prod set of keys
} else {
  // We are in development - return the dev keys
  module.exports = require("./dev");
}
module.exports = {
  googleClientID:
    "715889546022-cs3nphh1tpk8ls2o6rm5fkf57k4aqgtm.apps.googleusercontent.com",
  googleClientSecret: "J5s8sdiKbZU8lHqDSTMRglit",
  mongoURI:
    "mongodb+srv://Merek:gb6hBm42RGIToJXh@cluster0-jj1gg.mongodb.net/test?retryWrites=true&w=majority",
  cookieKey: "qwerthbvd"
};
