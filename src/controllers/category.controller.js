const {
  createCategory,
  showCategories,
  deleteCategory,
  updateCategory,
} = require("../services/categories.services");
const { addUserCategory } = require("../services/user.service");
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
    await addUserCategory(req.user, category.id);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.showCategories = async (req, res) => {
  try {
    const filters = req.query;
    const data = await showCategories(filters, req.user);
    res.send(await new categoryTransformer().transformList(data));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await deleteCategory(req.user, req.body.id);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await updateCategory(req.body);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};
