const { expenseCreateSchema } = require("../schema/expenseCreate.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.expenseCreateValidator = (data) => {
  const result = validate.validate(data, expenseCreateSchema);
  return baseValidator(result);
};
