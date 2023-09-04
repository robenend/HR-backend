const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String, 
    enum: ["Annual Leave", "Sick Leave", "Maternity Leave", "Other"],
    required: true
  },
  reason: {
    type: String,
    required: true,
  },
  halfDay: {
    type: Boolean,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  requestedOn: {
    type: Date,
    default: Date.now,
    required: true
  },
  decisionDate: {
    type: Date,
    default: null,
  },
  comments: {
    type: String,
    default: ''
  }
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;