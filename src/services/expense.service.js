const Expense = require("../models/Expense");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.createExpense = async (data, user) => {
  const { title, categoryId, subCategoryId, amount, meta, date } = data;
  try {
    const newUser = await new Expense({
      title,
      categoryId,
      subCategoryId,
      amount,
      userId: user.id,
      meta,
      date,
    }).save();
    return newUser;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.expenseDataNotValid };
  }
};
