const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const passwordSchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "users" },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("passwords", passwordSchema);
