const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    employeeID: {
        type: String, 
        ref: 'Employee',
        required: true
    },

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    fileURL: {
        type: String,
        required: true
    }
    });


module.exports = mongoose.model(
    'Document', DocumentSchema);