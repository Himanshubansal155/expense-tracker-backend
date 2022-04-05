const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const { ErrorCodes } = require("../utils/ErrorCodes");
const {
  deleteExpenseByCategory,
  removeSubCategory,
} = require("./expense.service");

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
        skip: filters?.offset ? filters?.offset : 0,
        sort: sortingClause,
      }
    ).exec();
    return categories;
  } catch (error) {
    throw error;
  }
};

exports.deleteCategory = async (user, id, includeExpenses) => {
  try {
    const category = await Category.findByIdAndDelete(id, {
      userId: user.id,
    }).exec();
    if (includeExpenses) {
      await deleteExpenseByCategory(id, user);
    }
    return category;
  } catch (error) {
    throw error;
  }
};

exports.showCategoryById = async (id) => {
  try {
    const category = await Category.findById(id).exec();
    return category;
  } catch (error) {
    throw error;
  }
};

exports.updateCategory = async (data, id) => {
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: data.title,
      },
      { new: true }
    ).exec();
    return category;
  } catch (error) {
    throw error;
  }
};

exports.addSubCategory = async (data, user) => {
  const { title, id } = data;
  try {
    const category = await new SubCategory({
      title,
      categoryId: id,
      userId: user.id,
    }).save();
    return category;
  } catch (error) {
    throw { message: error.message, code: ErrorCodes.subCategoryDataNotValid };
  }
};

exports.showSubCategories = async (filters, categoryId) => {
  const sortingClause = {
    [filters.sortCreatedAt && "createdAt"]: filters?.sortCreatedAt,
    [filters?.sortTitle && "title"]: filters?.sortTitle,
  };
  try {
    const categories = await SubCategory.find(
      {
        title: new RegExp(filters?.title || ""),
        categoryId,
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
    throw error;
  }
};

exports.deleteSubCategory = async (id) => {
  try {
    const category = await SubCategory.findByIdAndDelete(id).exec();
    await removeSubCategory(id);
    return category;

    return {};
  } catch (error) {
    throw error;
  }
};

exports.showSubCategoryById = async (id) => {
  try {
    const category = await SubCategory.findById(id).exec();
    return category;
  } catch (error) {
    throw error;
  }
};

exports.updateSubCategory = async (data, id) => {
  try {
    const category = await SubCategory.findByIdAndUpdate(
      id,
      {
        title: data.title,
      },
      { new: true }
    ).exec();
    return category;
  } catch (error) {
    throw error;
  }
};
