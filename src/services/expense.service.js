const Expense = require("../models/Expense");
const user = require("../models/user");
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

exports.deleteExpense = async (id) => {
  try {
    const expense = await Expense.findByIdAndDelete(id).exec();

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

exports.showAllExpenses = async (filters, user) => {
  const sortingClause = {
    [filters.sortDate && "date"]: filters?.sortDate,
    [filters?.sortTitle && "title"]: filters?.sortTitle,
    [filters?.sortAmount && "amount"]: filters?.sortAmount,
  };
  try {
    const expenses = await Expense.find(
      {
        userId: user.id,
        title: new RegExp(filters?.title || ""),
      },
      null,
      {
        limit: filters?.limit ? filters?.limit : 20,
        skip: filters?.offset ? filters?.offset : 0,
        sort: sortingClause,
      }
    ).exec();
    return expenses;
  } catch (error) {
    throw error;
  }
};
