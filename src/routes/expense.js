const express = require("express");
const {
  deleteExpense,
  updateExpense,
  addExpense,
  showExpense,
} = require("../controllers/expense.controller");
const app = express.Router();

app.get("/expense", showExpense);
app.post("/expense", addExpense);
app.put("/expense", updateExpense);
app.delete("/expense", deleteExpense);

module.exports = app;
