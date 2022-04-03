const express = require("express");
const {
  addCategory,
  showCategories,
  deleteCategory,
  updateCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
  showSubCategories,
} = require("../controllers/category.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.post("/category", [userMiddleware], addCategory);
app.put("/category", [userMiddleware], updateCategory);
app.get("/show-categories", [userMiddleware], showCategories);
app.delete("/category", [userMiddleware], deleteCategory);
//sub-categories
app.post("/subcategory", [userMiddleware], addSubCategory);
app.put("/subcategory", [userMiddleware], updateSubCategory);
app.get("/show-subcategories", [userMiddleware], showSubCategories);
app.delete("/subcategory", [userMiddleware], deleteSubCategory);

module.exports = app;
