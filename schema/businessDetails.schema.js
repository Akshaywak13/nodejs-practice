const mongoose = require("mongoose");

const businessDetailsSchema = new mongoose.Schema({
  businessTypeId: {
    type:Number,
    required: true,
    ref: "BusinessType",
  },
  BusinessCategoryId:{
    type:Number,
    required:true,
    ref: "BussinessCategory",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  businessName: {
    type: String,
  },
  businessDetails: {
    addressLi1: {
      type: String,
    },
    addressLi2: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    storePicUrl: {
      type: String,
    },
  },
  registrationdetails: {
    gstNumber: {
      type: String,
    },
    panNumber: {
      type: String,
    },
    verifyGSTNumberUrl: {
      type: String,
    },
    verifyRegistrationUrl: {
      type: String,
    },
  },
  BankDetails: {
    accountType: {
      type: String,
      enum:["saving","fixed","cd/co"]
    },
    accountName: {
        type: String,
      },
      IFSCCode: {
        type: String,
      },
  },
},
{
    timestamps:true
}
);

const BusinessDet =  mongoose.model("Business Details", businessDetailsSchema);
module.exports = BusinessDet;
