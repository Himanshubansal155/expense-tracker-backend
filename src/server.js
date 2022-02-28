const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require("./models/user");
const Passwords = require("./models/Passwords");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log("listening at port", process.env.PORT);
});
const uri =
  "mongodb+srv://expense-tracker:9458494357@cluster0.8imxs.mongodb.net/Expense-tracker?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then((res) => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

app.get("/", async (req, res) => {
  try {
    const users = await user.findOne({ email: "himanshu@gmail.com" });
    res.send(users);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
});

app.post("/user", async (req, res) => {
  res.send(req.body);
});
