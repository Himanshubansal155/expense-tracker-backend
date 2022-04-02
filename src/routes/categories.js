const express = require("express");
const { addCategory } = require("../controllers/category.controller");
const { userMiddleware } = require("../middlewares/user.middleware");
const app = express.Router();

app.post("/add-category", [userMiddleware], addCategory);

module.exports = app;
