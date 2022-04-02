const user = require("../models/user");
const bcrypt = require("bcrypt");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.showByEmail = async (data) => {
  const { email, password } = data;
  const userData = await user.findOne({ email: email }).exec();
  if (!userData) {
    throw { message: "Email Not Found", code: ErrorCodes.userNotFound };
  }
  const checkef = await bcrypt.compare(password, userData.password);
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

exports.showByMobile = async (data) => {
  const { phone } = data;
  const userData = await user.findOne({ phone }).exec();
  if (!userData) {
    throw { message: "Phone Number Not Found", code: ErrorCodes.userNotFound };
  }
  return userData;
};

exports.createUser = async (data) => {
  const { name, email, phone, password } = data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new user({
      email,
      name,
      phone,
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

exports.addUserCategory = async (userData, categoryId) => {
  try {
    await user
      .findByIdAndUpdate(userData.id, {
        categoryIds: [categoryId, ...userData.categoryIds],
      })
      .exec();
  } catch (error) {
    throw { error, code: ErrorCodes.categoryUserNotValidOrFound };
  }
};

exports.removeUserCategory = async (userData, categoryId) => {
  const categoriesIds = userData.categoryIds.filter(
    (category) => category != categoryId
  );
  try {
    await user
      .findByIdAndUpdate(userData.id, {
        categoryIds: categoriesIds,
      })
      .exec();
  } catch (error) {
    throw { error, code: ErrorCodes.categoryUserNotValidOrFound };
  }
};
