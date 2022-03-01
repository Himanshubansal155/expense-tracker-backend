const { userCreateSchema } = require("../schema/userCreate.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.userCreateValidator = (data) => {
  const result = validate.validate(data, userCreateSchema);
  return baseValidator(result);
};
