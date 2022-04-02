const { createCategory } = require("../services/categories.services");
const categoryTransformer = require("../transformers/category.transformer");
const { ErrorCodes } = require("../utils/ErrorCodes");
const { categoryCreateValidator } = require("../validators/category.validator");

exports.addCategory = async (req, res) => {
  try {
    categoryCreateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({
      message: error.message,
      code: ErrorCodes.categoryCreateValidation,
    });
    return;
  }
  try {
    const category = await createCategory(req.body, req.user);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};
