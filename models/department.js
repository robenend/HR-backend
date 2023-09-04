const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateRegistered: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model("Department", DepartmentSchema);
