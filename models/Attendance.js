const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    attendanceID: {
        type: String,
        required: true,
        unique: true
    },

    employeeID: {
        type: String,
        ref: 'Employee',
        required: true
    },

    checkInDateTime: {
        type: Date,
        required: true
    },
    checkOutDateTime: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model(
    'Attendance', AttendanceSchema);