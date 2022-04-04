const express = require("express");
const {
  addMonthBudget,
  showBudget,
} = require("../controllers/budget.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.post("/month-budget", [userMiddleware], addMonthBudget);
app.get("/show-budget/:year", [userMiddleware], showBudget);

module.exports = app;
