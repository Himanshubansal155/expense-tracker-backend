const express = require("express");
const {
  createUser,
  authenticate,
} = require("./../controllers/auth.controller");

const app = express.Router();

app.post("/register", createUser);
app.post("/login", authenticate);
module.exports = app;
