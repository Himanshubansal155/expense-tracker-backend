const {
  userLoginSchema,
  userLoginMobileSchema,
} = require("../schema/user.login.schema");
const { userCreateSchema } = require("../schema/userCreate.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.userCreateValidator = (data) => {
  const result = validate.validate(data, userCreateSchema);
  return baseValidator(result);
};

exports.userLoginValidator = (data) => {
  const result = validate.validate(data, userLoginSchema);
  return baseValidator(result);
};

exports.userLoginMobileValidator = (data) => {
  const result = validate.validate(data, userLoginMobileSchema);
  return baseValidator(result);
};
