const express = require("express");
const { createUser, authenticate } = require("./../controllers/auth.controller");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", authenticate);

module.exports = router;
