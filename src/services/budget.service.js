const Budget = require("../models/Budget");

exports.addMonthBudget = async (userId, data) => {
  const { amount, month, year } = data;
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, year },
      {
        $set: { [`monthlyBudget.${month}`]: amount },
      },
      { new: true }
    );
    return budget;
  } catch (error) {
    throw error;
  }
};

exports.addMonthExpenses = async (userId, month, year, amount) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId, year },
      {
        $inc: { [`monthlyExpenses.${month}`]: amount, yearBudget: amount },
      },
      { new: true }
    );
    return budget;
  } catch (error) {
    throw error;
  }
};

exports.createBudgetTable = async (userId, year) => {
  try {
    const BudgetTable = await new Budget({ userId, year }).save();
    return BudgetTable;
  } catch (error) {
    throw error;
  }
};

exports.getBudgetByYear = async (userId, year) => {
  try {
    const budget = await Budget.find({ userId, year }).exec();
    return budget;
  } catch (error) {
    throw error;
  }
};
