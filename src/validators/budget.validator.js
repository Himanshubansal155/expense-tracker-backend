const { monthBudgetSchema } = require("../schema/budgetMonth.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.budgetMonthValidator = (data) => {
  const result = validate.validate(data, monthBudgetSchema);
  return baseValidator(result);
};
