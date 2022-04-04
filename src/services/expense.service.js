const Budget = require("../models/Budget");
const Category = require("../models/Category");
const Expense = require("../models/Expense");
const user = require("../models/user");
const { ErrorCodes } = require("../utils/ErrorCodes");

const addTotalAmountInCategoryById = async (categoryId, amount) => {
  try {
    const category = await Category.findByIdAndUpdate(categoryId, {
      $inc: { totalAmount: amount },
    }).exec();
    return category;
  } catch (error) {
    throw error;
  }
};

exports.createExpense = async (data, user) => {
  try {
    const expense = await new Expense({
      userId: user.id,
      ...data,
    }).save();
    await addTotalAmountInCategoryById(expense.categoryId, expense.amount);
    return expense;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.expenseDataNotValid };
  }
};

exports.updateExpense = async (data, id) => {
  try {
    const oldExpense = await Expense.findById(id).exec();
    const expense = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
    await addTotalAmountInCategoryById(
      expense.categoryId,
      expense.amount - oldExpense.amount
    );
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
    await addTotalAmountInCategoryById(expense.categoryId, -expense.amount);
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
  let whereClause = {
    userId: user.id,
  };
  if (filters.title) {
    whereClause = { ...whereClause, title: new RegExp(filters?.title) };
  }
  if (filters.categoryId) {
    whereClause = { ...whereClause, categoryId: filters.categoryId };
  }
  if (filters.subCategoryId) {
    whereClause = { ...whereClause, subCategoryId: filters.subCategoryId };
  }
  if (filters.date) {
    whereClause = { ...whereClause, date: filters.date };
  }
  if (filters.startDate && filters.endDate) {
    whereClause = {
      ...whereClause,
      date: {
        $gte: filters.startDate,
        $lt: filters.endDate,
      },
    };
  }
  try {
    const expenses = await Expense.find(
      {
        amount: {
          $gte: filters.greaterAmount || 0,
          $lte: filters.lesserAmount || Infinity,
        },
        ...whereClause,
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

exports.deleteExpenseByCategory = async (categoryId) => {
  try {
    const expenses = await Expense.deleteMany({ categoryId }).exec();
    return expenses;
  } catch (error) {
    throw error;
  }
};

exports.removeSubCategory = async (subCategoryId) => {
  try {
    const expenses = await Expense.updateMany(
      { subCategoryId },
      { subCategoryId: null }
    ).exec();
    return expenses;
  } catch (error) {
    throw error;
  }
};
