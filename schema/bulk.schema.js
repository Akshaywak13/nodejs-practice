const mongoose = require('mongoose');

const bulkSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        age:{
            type:Number,
            required: true
        }
    },{
        timestamps: true
    }
);

const BulkUpSchema = mongoose.model('BulkUpSchema',bulkSchema);
module.exports = BulkUpSchema;