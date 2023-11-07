const morgan = require("./morganSetup");
const defaultError = require("./defaultError");
const errorCatcher = require("./errorCatcher");
const uploader = require("./uploader");

module.exports = {
  morgan,
  defaultError,
  errorCatcher,
  uploader,
};
