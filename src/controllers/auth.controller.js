const jsonwebtoken = require("jsonwebtoken");
const { createUser, showByEmail } = require("../services/user.service");
const {
  userCreateValidator,
  userLoginValidator,
} = require("../validators/user.validator");

exports.createUser = async (req, res) => {
  try {
    userCreateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
  try {
    const newUser = await createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.authenticate = async (req, res) => {
  try {
    await userLoginValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send(error);
  }
  try {
    const user = await showByEmail(req.body);
    const token = jsonwebtoken.sign(
      {
        data: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
      },
      process.env.SECRET_TOKEN
    );
    res.json({ user, token: token });
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.me = async (req, res) => {
  if (req.user) {
    res.send(req.user);
  }
};
