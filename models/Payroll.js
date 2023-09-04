const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PayrollSchema = new Schema({
  payrollID: {
    type: String,
    required: true,
    unique: true
  },
  employeeID: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  periodStartDate: {
    type: Date,
    required: true
  },
  periodEndDate: {
    type: Date,
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowance: {
    type: Number,
    default: 0,
    required: true
  },
  deduction: {
    type: Number,
    default: 0,
    required: true
  },
  netSalary: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Payroll', PayrollSchema);