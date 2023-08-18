const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  DepartmentName: {
    type: String,
    required: true,
    unique: true,
  },

  Description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);
