const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeTrainingSchema = new Schema({
  employeeID: {
    type: String,
    ref: "Employee",
    required: true,
  },
  trainer: {
    type: String,
    ref: "Employee",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  trainingName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("EmployeeTraining", EmployeeTrainingSchema);
