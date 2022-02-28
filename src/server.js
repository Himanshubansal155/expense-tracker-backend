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

app.get("/", async (req, res) => {
  try {
    //   // const newUser = await new user({
    //   //   // email: "himanshu@gmail.com",
    //   //   // name: "himanshu",
    //   //   // address: "lal",
    //   // }).save();
    //   // const pass = await new Passwords({
    //   //   // userId: newUser._id,
    //   //   // password: "123456",
    //   // }).save();
    user
      .findOne({ email: "himanshubansal155gmail.com" })
      .populate("password")
      .exec(function (err, story) {
        // if (err) return handleError(err);
        console.log("The author is %s", err, story);
        // prints "The author is Ian Fleming"
        res.send(story);
      });
    console.log(newUser, pass);
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
  res.send("hello");
});

app.post("/user", async (req, res) => {
  res.send(req.body);
});

const uri =
  "mongodb+srv://expense-tracker:9458494357@cluster0.8imxs.mongodb.net/Expense-tracker?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then((res) => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERR", err));
