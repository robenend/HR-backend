const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    AttendanceID: {
        type: String,
        required: true,
        unique: true
    },

    EmployeeID: {
        type: String,
        ref: 'Employee',
        required: true
    },

    CheckInDateTime: {
        type: Date,
        required: true
    },
    CheckOutDateTime: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model(
    'Attendance', AttendanceSchema);