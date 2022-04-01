const express = require("express");
const { upload, remove } = require("../controllers/upload.controller");
const app = express.Router();

app.post("/upload", upload);
app.delete("/expense", remove);

module.exports = app;
