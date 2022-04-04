const TransformerAbstract = require("./base.transformer");

class categoryTransformer extends TransformerAbstract {
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
