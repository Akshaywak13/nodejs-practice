const mongoose = require('mongoose');

const BusinessTypeSchema = new mongoose.Schema(
    {
        businessTypeId: {
            type: Number,
            required: true,
            unique: true 
        },
        businessType: {
            type: String,
            required: true
        }
    },
    {
        strict: true,
        timestamps: true
    }
);

const BusinessType = mongoose.model('BusinessType', BusinessTypeSchema);
module.exports = BusinessType;