const {
  createExpense,
  updateExpense,
  showExpense,
  deleteExpense,
  showAllExpenses,
} = require("../services/expense.service");
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
    const expense = await createExpense(req.body, req.user);
    res.status(201).json(await new expenseTransformer().transform(expense));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.showExpense = async (req, res) => {
  try {
    const id = req.params?.id;
    const data = await showExpense(id);
    res.send(await new expenseTransformer().transform(data, ["subCategory"]));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.updateExpense = async (req, res) => {
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
    const id = req.params?.id;
    const expense = await updateExpense(req.body, id);
    res.status(202).send(await new expenseTransformer().transform(expense));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params?.id;
    const expense = await deleteExpense(id);
    res.send(await new expenseTransformer().transform(expense));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.showAllExpense = async (req, res) => {
  try {
    const filters = req.query;
    const expenses = await showAllExpenses(filters, req.user);
    res.send(
      await new expenseTransformer().transformList(expenses, ["subCategory", "category"])
    );
  } catch (error) {
    res.status(422).send(error);
  }
};
