const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema(
    {
        groupId:{
            type:Number,
            required: true
        },
        accountName: {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: [
                'Checking',
                'Business',
                'Loan',
                'Student Loan',
                'Retirement',
                'CD',
                'Certificate of Deposit',
                'Money Market Account',
            ]
        },
        detailType: {
            type: String,
            enum: [
                'Personal',
                'Business',
                'Joint',
                'Unknown',
            ],
            required: false
        },
        description: {
            type: String,
            required: true
        },
        opningBalance: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
        strict: false
    }
);


module.exports = mongoose.model("Account", AccountSchema);
