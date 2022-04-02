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

exports.showCategories = async (filters, user) => {
  const sortingClause = {
    [filters.sortCreatedAt && "createdAt"]: filters?.sortCreatedAt,
    [filters?.sortTitle && "title"]: filters?.sortTitle,
  };
  try {
    const categories = await Category.find(
      {
        title: new RegExp(filters?.title || ""),
        userId: user.id,
      },
      null,
      {
        limit: filters?.limit ? filters?.limit : 20,
        skip: filters?.limit ? filters?.limit : 0,
        sort: sortingClause,
      }
    ).exec();
    return categories;
  } catch (error) {
    return error;
  }
};
