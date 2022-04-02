const express = require("express");
const { upload, remove } = require("../controllers/upload.controller");
const app = express.Router();

app.post("/image", upload);
app.delete("/image", remove);

module.exports = app;
