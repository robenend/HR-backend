const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    DocumentID: {
        type: Number,
        required: true,
        unique: true
    },

    EmployeeID: {
        type: String, 
        ref: 'Employee',
        required: true
    },

    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    UploadDate: {
        type: Date,
        required: true
    },
    FileUrl: {
        type: String,
        required: true
    }
    });


module.exports = mongoose.model(
    'Document', DocumentSchema);