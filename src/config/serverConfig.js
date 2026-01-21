require("dotenv").config({ quiet: true });

module.exports = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
};
