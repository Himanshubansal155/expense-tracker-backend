const Expense = require("../models/Expense");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.createExpense = async (data, user) => {
  // const { title, categoryId, subCategoryId, amount, meta, date, description } =
  //   data;
  try {
    const expense = await new Expense({
      userId: user.id,
      ...data,
    }).save();
    return expense;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.expenseDataNotValid };
  }
};

exports.updateExpense = async (data, id) => {
  try {
    const expense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    if (!expense) {
      throw {
        message: "Expense Not Found",
        code: ErrorCodes.expenseNotFound,
      };
    }
    return expense;
  } catch (error) {
    throw error;
  }
};

exports.showExpense = async (id) => {
  try {
    const expense = await Expense.findById(id).exec();

    if (!expense) {
      throw {
        message: "Expense Not Found",
        code: ErrorCodes.expenseNotFound,
      };
    }
    return expense;
  } catch (error) {
    throw error;
  }
};
