const jsonwebtoken = require("jsonwebtoken");
const {
  createUser,
  showByEmail,
  showByMobile,
  deleteUser,
  updateUserData,
} = require("../services/user.service");
const userTransformer = require("../transformers/user.transformer");
const { ErrorCodes } = require("../utils/ErrorCodes");
const {
  userCreateValidator,
  userLoginValidator,
  userLoginMobileValidator,
  userUpdateValidator,
} = require("../validators/user.validator");
const bcrypt = require("bcrypt");

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
    res
      .status(201)
      .json({ user: await new userTransformer().transform(user), token });
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

exports.updateUser = async (req, res) => {
  try {
    userUpdateValidator(req.body);
  } catch (error) {
    res.statusCode = 422;
    res.send({
      message: error.message,
      code: ErrorCodes.userCreateValidation,
    });
    return;
  }
  try {
    const id = req.user?.id;
    const user = await updateUserData(req.body, id);
    res.status(202).send(await new userTransformer().transform(user));
  } catch (error) {
    res.statusCode = 404;
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.user?.id;
    const user = await deleteUser(id);
    res.send(await new userTransformer().transform(user));
  } catch (error) {
    res.status(422).send(error);
  }
};
exports.verifyPassword = async (req, res) => {
  if (req.body.password) {
    const checkef = await bcrypt.compare(req.body.password, req.user.password);
    if (checkef) {
      res.send(await new userTransformer().transform(req.user));
    } else {
      res.statusCode = 404;
      res.send({
        message: "Password Not Correct",
        code: ErrorCodes.userPasswordIncorrect,
      });
    }
  } else {
    res.statusCode = 404;
    res.send({
      message: "Password Not Found",
      code: ErrorCodes.userPasswordIncorrect,
    });
  }
};
