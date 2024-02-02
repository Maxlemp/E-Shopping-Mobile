const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";

  if (validator.isEmpty(data.fullname)) {
    errors.fullname = "Fullname Required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email Required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email Format Required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Required";
  }
  if (!validator.equals(data.password, data.confirm)) {
    errors.confirm = "The Password doesn't match the confirmation";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Password Confirmation Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
