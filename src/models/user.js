const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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
    address: String,
    password: { type: String, ref: "passwords" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
