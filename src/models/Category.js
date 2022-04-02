const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    subCategoryIds: [
      {
        type: ObjectId,
        required: false,
        ref: "subcategories",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", categorySchema);
