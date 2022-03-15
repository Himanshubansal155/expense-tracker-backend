const Passwords = require("../models/Passwords");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.showByEmail = async (data) => {
  const { email, password } = data;
  const userData = await user.findOne({ email: email }).exec();
  if (!userData) {
    throw { message: "Email Not Found", code: ErrorCodes.userNotFound };
  }
  const passwordData = await Passwords.findOne({
    userId: userData.id,
  }).exec();
  if (!passwordData) {
    throw { message: "User Not Found", code: ErrorCodes.userNotFound };
  }
  const checkef = await bcrypt.compare(password, passwordData.password);
  if (!checkef) {
    throw {
      message: "Password Not Correct",
      code: ErrorCodes.userPasswordIncorrect,
    };
  }
  if (!!checkef) {
    return userData;
  }
};

exports.createUser = async (data) => {
  const { name, email, address, password } = data;
  try {
    const newUser = await new user({
      email,
      name,
      address,
    }).save();
    const hashedPassword = await bcrypt.hash(password, 10);
    await new Passwords({
      userId: newUser.id,
      password: hashedPassword,
    }).save();
    return newUser;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.userNotValid };
  }
};

exports.showById = async (id) => {
  try {
    const userData = await user.findById(id).exec();
    return userData;
  } catch (error) {
    throw { error, code: ErrorCodes.userNotFound };
  }
};
