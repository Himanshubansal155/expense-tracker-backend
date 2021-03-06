const {
  addMonthBudget,
  getBudgetByYear,
  createBudgetTable,
} = require("../services/budget.service");
const { ErrorCodes } = require("../utils/ErrorCodes");
const { budgetMonthValidator } = require("../validators/budget.validator");
const budgetTransformer = require("./../transformers/budget.transformer");

exports.addMonthBudget = async (req, res) => {
  try {
    budgetMonthValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({
      message: error.message,
      code: ErrorCodes.budgetMonthValidation,
    });
    return;
  }
  try {
    const budgetMonth = await addMonthBudget(req.user?.id, req.body);
    res.status(201).send(await new budgetTransformer().transform(budgetMonth));
  } catch (error) {
    res.status(422).send(error);
  }
};

exports.showBudget = async (req, res) => {
  try {
    const year = req.params.year;
    const getBudget = await getBudgetByYear(req.user.id, year);
    if (getBudget.length === 0) {
      const budget = await createBudgetTable(req.user.id, year);
      res.status(201).send(await new budgetTransformer().transform(budget));
      return;
    }
    res.send(await new budgetTransformer().transform(getBudget[0]));
  } catch (error) {
    res.status(422).send(error);
  }
};
