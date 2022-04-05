const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "users",
    },
    year: {
      type: Number,
      required: true,
    },
    yearBudget: {
      type: Number,
      default: 0,
    },
    monthlyBudget: {
      type: [Number],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    monthlyExpenses: {
      type: [Number],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("budget", budgetSchema);
