const jsonwebtoken = require("jsonwebtoken");
const {
  createUser,
  showByEmail,
  showByMobile,
} = require("../services/user.service");
const userTransformer = require("../transformers/user.transformer");
const { ErrorCodes } = require("../utils/ErrorCodes");
const {
  userCreateValidator,
  userLoginValidator,
  userLoginMobileValidator,
} = require("../validators/user.validator");

exports.createUser = async (req, res) => {
  try {
    userCreateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({ message: error.message, code: ErrorCodes.userCreateValidation });
    return;
  }
  try {
    const user = await createUser(req.body);
    const token = jsonwebtoken.sign(
      {
        data: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
      },
      process.env.SECRET_TOKEN
    );
    res.json({ user: await new userTransformer().transform(user), token });
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
    res.send({ message: error.message, code: ErrorCodes.userLoginValidation });
    return;
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
    res.json({ user: await new userTransformer().transform(user), token });
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.authenticateMobile = async (req, res) => {
  try {
    await userLoginMobileValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({ message: error.message, code: ErrorCodes.userLoginValidation });
    return;
  }
  try {
    const user = await showByMobile(req.body);
    const token = jsonwebtoken.sign(
      {
        data: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
      },
      process.env.SECRET_TOKEN
    );
    res.json({ user: await new userTransformer().transform(user), token });
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.me = async (req, res) => {
  if (req.user) {
    res.send(await new userTransformer().transform(req.user));
  }
};
