const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const bankAccountSchema = new mongoose.Schema({
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Savings", "Checking", "Business"],
    required: true,
  },
  balance: {
    type: mongoose.Decimal128,
    required: true,
    default: 0.0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now,
  },
  address: addressSchema,
});

const BankAccount = mongoose.model('Bank', bankAccountSchema);

module.exports = BankAccount;

// module.exports = mongoose.model('Bank', bankAccountSchema);