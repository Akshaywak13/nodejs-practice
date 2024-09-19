const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
    {
        bookId: {
            type: Number,
            required: true,
            unique: true 
        },
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

module.exports =  mongoose.model('Book',BookSchema);
