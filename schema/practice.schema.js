const mongoose = require('mongoose');

const PrtSchema = new mongoose.Schema(
    {
        groupId: {
            type: Number,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        userId: {
            type: Number,
            required: false,
        },
        phoneNumber: {
            type: Number,
            required: false,
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

module.exports =  mongoose.model('PRT',PrtSchema);