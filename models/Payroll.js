const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayrollSchema = new Schema({
    PayrollID: {
        type: String,
        required: true,
        unique: true
    },

    EmployeeID: {
        type: String, 
        ref: 'Employee',
        required: true
    },

    Salary: {
        type: Number,
        required: true
    },
    PeriodStartDate: {
        type: Date,
        required: true
    },

    PeriodEndDate: {
        type: Date,
        required: true
    },
    BasicSalary: {
        type: Number,
        required: true
    },
    Allowance: {
        type: Number,
        required: true
    },
    Deduction: {
        type: Number,
        required: true,
    },
    NetSalary: {
        type: Number,
        required: true
    }
    });


module.exports = mongoose.model(
    'Payroll', PayrollSchema);