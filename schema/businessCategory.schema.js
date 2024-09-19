const mongoose = require("mongoose");

const BusinessCategoryModel = new mongoose.Schema(
  {
    BusinessCategoryId: {
      type: Number,
    },
    businessTypeId: {
      type:Number,
      required: true,
      ref: "BusinessType",
    },
    BusinessCategoryName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const businessCategory = mongoose.model("BussinessCategory",BusinessCategoryModel);
module.exports = businessCategory;
