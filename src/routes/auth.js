const express = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const {
  createUser,
  authenticate,
  me,
  authenticateMobile,
} = require("./../controllers/auth.controller");

const app = express.Router();

app.post("/signup", createUser);
app.post("/login", authenticate);
app.post("/login-mobile", authenticateMobile);
app.get("/me", [userMiddleware], me);
module.exports = app;
