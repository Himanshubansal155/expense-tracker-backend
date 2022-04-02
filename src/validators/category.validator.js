const { categoryCreateSchema } = require("../schema/categoryCreate.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.categoryCreateValidator = (data) => {
  const result = validate.validate(data, categoryCreateSchema);
  return baseValidator(result);
};
