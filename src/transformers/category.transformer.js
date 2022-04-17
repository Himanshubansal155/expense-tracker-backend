const { showSubCategories } = require("../services/categories.services");
const TransformerAbstract = require("./base.transformer");

class categoryTransformer extends TransformerAbstract {
  defaultIncludes = ["subCategory"];

  async includeSubCategory(category) {
    return await showSubCategories({}, category.id);
  }

  _map(category) {
    return {
      id: category.id,
      title: category.title,
      createdAt: category.createdAt,
      totalAmount: category.totalAmount,
      updatedAt: category.updatedAt,
    };
  }
}

module.exports = categoryTransformer;
