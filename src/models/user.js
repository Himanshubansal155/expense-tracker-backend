const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    categoryIds: [
      {
        type: ObjectId,
        required: false,
        ref: "categories",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
