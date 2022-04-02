const express = require("express");
const {
  deleteExpense,
  updateExpense,
  addExpense,
  showExpense,
} = require("../controllers/expense.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.get("/expense", showExpense);
app.post("/expense", [userMiddleware], addExpense);
app.put("/expense", updateExpense);
app.delete("/expense", deleteExpense);

module.exports = app;
