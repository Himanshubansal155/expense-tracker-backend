const express = require("express");
const { userCreateValidator } = require("../validators/user.validator");
const app = express.Router();

app.get("/", (req, res) => {
  try {
    userCreateValidator({ email: "himanshu" });
    res.send("Running");
  } catch (err) {
    res.send(err.message);
  }
});
app.get("/test", (req, res) => res.send("SERVER TESTED SUCCESSFULLY"));

module.exports = app;
