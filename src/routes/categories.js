const express = require("express");
const {
  addCategory,
  showCategories,
} = require("../controllers/category.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.post("/add-category", [userMiddleware], addCategory);
app.get("/show-categories", [userMiddleware], showCategories);

module.exports = app;
