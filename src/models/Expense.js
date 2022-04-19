const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    categoryId: {
      type: ObjectId,
      required: true,
      ref: "categories",
    },
    amount: {
      type: Number,
      required: true,
    },
    subCategoryId: {
      type: ObjectId,
      required: false,
      ref: "subcategories",
    },
    date: {
      type: Date,
      required: true,
    },
    meta: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expenses", expenseSchema);
