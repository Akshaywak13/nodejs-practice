const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        marks: {
            type: Number,
            required: true
        }
    }
)

const StudentSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        class:{
            type: String,
            required: true
        },
        subjects:[subjectSchema],
        deleted: {
            type: Boolean,
            default: false
          }
    }
);

const Student = mongoose.model('Student',StudentSchema);
module.exports = Student;