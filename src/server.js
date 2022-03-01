const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const cors = require("cors");
dotenv.config();

const app = express();

exports.useAppRoutes = () => app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.DATABASE;
mongoose
  .connect(uri)
  .then((res) => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERR", err));
  
readdirSync("./src/routes").map((r) => app.set("/", require("./routes/" + r)));
app.listen(process.env.PORT, () => {
  console.log("listening at port", process.env.PORT);
});
