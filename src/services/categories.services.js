const Category = require("../models/Category");
const { ErrorCodes } = require("../utils/ErrorCodes");

exports.createCategory = async (data, user) => {
  const { title } = data;
  try {
    const category = await new Category({
      title,
      userId: user.id,
    }).save();
    return category;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.categoryDataNotValid };
  }
};
