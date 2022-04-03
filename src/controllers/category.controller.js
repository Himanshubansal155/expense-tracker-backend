const {
  createCategory,
  showCategories,
  deleteCategory,
  updateCategory,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  showSubCategories,
} = require("../services/categories.services");
const categoryTransformer = require("../transformers/category.transformer");
const subCategoryTransformer = require("../transformers/subcategory.tranformer");
const { ErrorCodes } = require("../utils/ErrorCodes");
const {
  categoryCreateValidator,
  subCategoryCreateValidator,
} = require("../validators/category.validator");

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
    res.status(201).send(await new categoryTransformer().transform(category));
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
    const id = req.params?.id;
    const category = await deleteCategory(req.user, id);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params?.id;
    const category = await updateCategory(req.body, id);
    res.send(await new categoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};

//Sub-category

exports.addSubCategory = async (req, res) => {
  try {
    subCategoryCreateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({
      message: error.message,
      code: ErrorCodes.subCategoryCreateValidation,
    });
    return;
  }
  try {
    const category = await addSubCategory(req.body, req.user);
    res.status(201).send(new subCategoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.showSubCategories = async (req, res) => {
  try {
    const filters = req.query;
    const data = await showSubCategories(filters, req.user);
    res.send(await new subCategoryTransformer().transformList(data));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.params?.id;
    const category = await deleteSubCategory(id);
    res.send(await new subCategoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params?.id;
    const category = await updateSubCategory(req.body, id);
    res.send(await new subCategoryTransformer().transform(category));
  } catch (error) {
    res.status(422).send(error);
  }
};
