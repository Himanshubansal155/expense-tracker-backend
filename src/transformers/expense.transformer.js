const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const TransformerAbstract = require("./base.transformer");
const categoryTransformer = require("./category.transformer");
const subCategoryTransformer = require("./subcategory.tranformer");

class expenseTransformer extends TransformerAbstract {
  defaultIncludes = ["category"];

  async includeCategory(expense) {
    const category = await Category.findById(expense.categoryId).exec();
    if (!category) {
      return null;
    }
    return await new categoryTransformer().transform(category);
  }
  async includeSubCategory(expense) {
    const subCategory = await SubCategory.findById(
      expense.subCategoryId
    ).exec();
    if (!subCategory) {
      return null;
    }
    return await new subCategoryTransformer().transform(subCategory);
  }

  _map(expense) {
    return {
      id: expense.id,
      title: expense.title,
      amount: expense.amount,
      description: expense.description,
      date: expense.date,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    };
  }
}

module.exports = expenseTransformer;
