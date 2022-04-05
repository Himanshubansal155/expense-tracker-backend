const TransformerAbstract = require("./base.transformer");

class budgetTransformer extends TransformerAbstract {
  _map(budget) {
    return {
      id: budget.id,
      year: budget.year,
      monthlyBudget: budget.monthlyBudget,
      monthlyExpenses: budget.monthlyExpenses,
      yearBudget: budget.yearBudget,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    };
  }
}

module.exports = budgetTransformer;
