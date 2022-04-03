const { categoryCreateSchema } = require("../schema/categoryCreate.schema");
const {
  subCategoryCreateSchema,
} = require("../schema/subCategoryCreate.schema");
const { baseValidator } = require("./base.validator");

const Validator = require("jsonschema").Validator;
const validate = new Validator();

exports.categoryCreateValidator = (data) => {
  const result = validate.validate(data, categoryCreateSchema);
  return baseValidator(result);
};

exports.subCategoryCreateValidator = (data) => {
  const result = validate.validate(data, subCategoryCreateSchema);
  return baseValidator(result);
};
