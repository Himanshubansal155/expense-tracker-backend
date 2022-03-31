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
    category: {
      type: String,
      required: true,
      ref: "categories",
    },
    amount: {
      type: Number,
      required: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    meta: {
      file_url: String,
      file_name: String,
      file_type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expenses", expenseSchema);
