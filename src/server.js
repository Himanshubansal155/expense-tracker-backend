const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const { dbConnection } = require("./config/db");
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use(morgan("dev"));
dbConnection();

readdirSync("./src/routes").map((r) => app.use("/", require("./routes/" + r)));
app.listen(process.env.PORT, () => {
  console.log("listening at port", process.env.PORT);
});
