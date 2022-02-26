const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.NODE_PORT, () => {
  console.log("listening at port", process.env.NODE_PORT);
});

app.get("/", async (req, res) => {
  res.send("hello world");
});
