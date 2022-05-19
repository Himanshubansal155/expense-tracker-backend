const express = require("express");
const { userMiddleware } = require("../middlewares/user.middleware");
const {
  createUser,
  authenticate,
  me,
  authenticateMobile,
  verifyPassword,
  updateUser,
  deleteUser,
} = require("./../controllers/auth.controller");

const app = express.Router();

app.post("/signup", createUser);
app.post("/login", authenticate);
app.post("/login-mobile", authenticateMobile);
app.get("/me", [userMiddleware], me);
app.put("/me", [userMiddleware], updateUser);
app.delete("/me", [userMiddleware], deleteUser);
app.get("/verify-password", [userMiddleware], verifyPassword);

module.exports = app;
