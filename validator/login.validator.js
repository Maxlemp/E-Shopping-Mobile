const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateLogin(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email Format Required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email Required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
