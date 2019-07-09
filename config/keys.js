// keys.js - Figure out what credentials to return

if (process.env.NODE_ENV === "production") {
  // We are in production - return the prod set of keys
} else {
  // We are in development - return the dev keys
  module.exports = require("./dev");
}
