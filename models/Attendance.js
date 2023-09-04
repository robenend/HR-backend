const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    employeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'On Leave'],
        required: true
    },
    checkInDateTime: {
        type: Date,
    },
    checkOutDateTime: {
        type: Date
    },
    recordedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    updatedDate:{
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model(
    'Attendance', attendanceSchema);