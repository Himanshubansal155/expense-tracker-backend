const TransformerAbstract = require("./base.transformer");

class subCategoryTransformer extends TransformerAbstract {
  _map(subcategory) {
    return {
      id: subcategory.id,
      title: subcategory.title,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    };
  }
}

module.exports = subCategoryTransformer;
