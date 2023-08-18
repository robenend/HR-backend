const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
  positionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
  hiringManagerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String },
  requiredSkills: [{ type: String }],
  status: { type: String, enum: ['Open', 'Closed'], required: true },
  applicationDeadline: { type: Date, required: true },
  hiredEmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }, 
});

const Recruitment = mongoose.model('Recruitment', recruitmentSchema);

module.exports = Recruitment;
