const { createExpense } = require("../services/expense.service");
const expenseTransformer = require("../transformers/expense.transformer");
const { ErrorCodes } = require("../utils/ErrorCodes");
const { expenseCreateValidator } = require("../validators/expense.validator");

exports.addExpense = async (req, res) => {
  try {
    expenseCreateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({
      message: error.message,
      code: ErrorCodes.expenseCreateValidation,
    });
    return;
  }
  try {
    const expense = await createExpense(req.body, req.body);
    res.status(201).json(await new expenseTransformer().transform(expense));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};
exports.showExpense = async (req, res) => {
  res.send("completes");
};
exports.updateExpense = async (req, res) => {};
exports.deleteExpense = async (req, res) => {};
