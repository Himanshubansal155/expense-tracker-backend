const jsonwebtoken = require("jsonwebtoken");
const { showById } = require("../services/user.service");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.userMiddleware = async (req, res, next) => {
  let token;
  try {
    const jwtToken = req.headers.token;
    token = jsonwebtoken.verify(jwtToken, process.env.SECRET_TOKEN);
  } catch (error) {
    res.statusCode = 401;
    res.send({ message: error.message, code: ErrorCodes.jwtTokenExpire });
    return;
  }
  try {
    const user = await showById(token.data);
    req.user = user;
    next();
  } catch (error) {
    res.send(error);
  }
};
