const { createUser, authenticate } = require("../services/user.service");
const { userCreateValidator } = require("../validators/user.validator");

exports.createUser = async (req, res) => {
  try {
    userCreateValidator(req.body);
  } catch (error) {
    res.send(error.message);
  }
  const newUser = await createUser(req.body);
  console.log("USER CREATED", newUser);
  res.json(newUser);
};

exports.authenticate = async (req, res) => {
  const user = await authenticate(req.email);
  res.json(user);
};
