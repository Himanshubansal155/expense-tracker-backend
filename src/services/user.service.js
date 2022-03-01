const Passwords = require("../models/Passwords");
const user = require("../models/user");

exports.showByEmail = async (email) => {
  return await user.findByEmail({ email });
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
