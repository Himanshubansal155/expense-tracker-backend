const express = require("express");
const {
  deleteExpense,
  updateExpense,
  addExpense,
  showExpense,
  showAllExpense,
} = require("../controllers/expense.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.get("/expense/:id", [userMiddleware], showExpense);
app.post("/expense", [userMiddleware], addExpense);
app.put("/expense/:id", [userMiddleware], updateExpense);
app.delete("/expense/:id", [userMiddleware], deleteExpense);

app.get("/all-expenses", [userMiddleware], showAllExpense);

module.exports = app;
