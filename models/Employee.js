const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema({
  employeeID: { 
    type: String, 
    required: true, 
    unique: true, 
    set: (value) => value.toUpperCase() 
  },
  
  firstName: {
     type: String, 
     required: true, 
     set: (value) => value.toLowerCase() 
    },

  lastName: { 
    type: String, 
    required: true, 
    set: (value) => value.toLowerCase() 
  },

  dateOfBirth: { 
    type: Date, 
    validate: { validator: date => date <= new Date(), message: 'Invalid date of birth' } 
  },

  gender: { 
    type: String, 
    set: (value) => value.toLowerCase(), 
    enum: ['male', 'female'] 
  },

  contactNumber: { 
    type: String, 
    match: /^\d{10}$/, 
    trim: true 
  },

  role: {
   type: String,
   enum: ['user', 'attendanceAdmin', 'admin'],
   default: "user"
  },

  email: {
    type: String,
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid email format',
    },
    set: (value) => value.toLowerCase(),
  },

  password: {
    type: String,
    required: true
  },

  employmentStatus: {
     type: String, 
     set: (value) => value.toLowerCase(), 
     enum: ['full-time', 'part-time', 'contract'] 
    },

  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  }],

  rankID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Rank',
    required: true
  },
  
  performanceRating: { 
    type: Number, 
    required: false,
    min: 0, max: 10 },
    
  joinDate: { 
    type: Date, 
    default: Date.now },

  refreshToken: String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
