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
    res.send(error.message);
  }
  const newUser = await createUser(req.body);
  console.log("USER CREATED", newUser);
  res.json(newUser);
};

exports.authenticate = async (req, res) => {
  try {
    await userLoginValidator(req.body);
    const user = await showByEmail(req.body);
    if (user?.id) {
      const token = jsonwebtoken.sign(
        {
          data: user.id,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 3,
        },
        process.env.SECRET_TOKEN
      );
      res.json({ user, token: token });
    } else {
      res.send("No User Found");
    }
  } catch (error) {
    res.send(error);
  }
};
