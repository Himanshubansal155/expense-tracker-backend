const jsonwebtoken = require("jsonwebtoken");
const { showById } = require("../services/user.service");

exports.userMiddleware = async (req, res, next) => {
  try {
    const jwtToken = req.headers.token;
    const token = jsonwebtoken.verify(jwtToken, process.env.SECRET_TOKEN);
    const user = await showById(token.data);
    req.user = user;
    next();
  } catch (error) {
    res.statusCode = 401;
    res.send(error);
  }
};
