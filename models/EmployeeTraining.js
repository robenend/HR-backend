const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeTrainingSchema = new Schema({
  TrainingID: {
    type: String,
    required: true,
    unique: true,
  },

  EmployeeID: {
    type: String,
    ref: "Employee",
    required: false,
  },

  Description: {
    type: String,
    required: true,
  },
  Trainer: {
    type: String,
    ref: "Employee",
    required: false,
  },
  StartDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  TrainingName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("EmployeeTraining", EmployeeTrainingSchema);
