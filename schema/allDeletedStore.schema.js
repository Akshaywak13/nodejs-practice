const mongoose = require("mongoose");

const archivedBulkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ArchivedBulkSchema = mongoose.model("ArchivedBulkSchema", archivedBulkSchema);
module.exports = ArchivedBulkSchema;
