const Passwords = require("../models/Passwords");
const user = require("../models/user");

exports.showByEmail = async (data) => {
  const { email, password } = data;
  const userData = await user.findOne({ email: email }).exec();
  if (!userData) {
    throw { message: "Email Not Found" };
  }
  const valid = await Passwords.findOne({
    userId: userData.id,
    password: password,
  }).exec();

  if (!valid) {
    throw { message: "Password Not Correct" };
  }
  if (!!valid) {
    return userData;
  }
};

exports.createUser = async (data) => {
  const { name, email, address, password } = data;
  const newUser = await new user({
    email,
    name,
    address,
  }).save();
  await new Passwords({
    userId: newUser.userId,
    password,
  }).save();
  return newUser;
};
