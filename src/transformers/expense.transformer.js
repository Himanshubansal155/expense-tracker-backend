const Category = require("../models/Category");
const TransformerAbstract = require("./base.transformer");

class expenseTransformer extends TransformerAbstract {
  defaultIncludes = ["category"];

  async includeCategory(expense) {
    const category = await Category.findById(expense.categoryId).exec();
    return category;
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
