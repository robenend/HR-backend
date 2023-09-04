const Payroll = require('../models/Payroll');
const Attendance = require("../models/Attendance")
const Joi = require('joi');

const calculateAbsences = async (attendanceRecords) => {
    let absences = 0;
  
    for (const record of attendanceRecords) {
      if (!record.CheckInDateTime || !record.CheckOutDateTime) {
        absences++;
      }
    }
  
    return absences;
  }

// Create a new payroll
const createNewPayroll = async (req, res) => {
    try {
        // Joi schema for payroll validation
        const payrollSchema = Joi.object({
            payrollID: Joi.string().required(),
            employeeID: Joi.string().required(),
            salary: Joi.number().min(0),
            periodStartDate: Joi.date().required(),
            periodEndDate: Joi.date().min(Joi.ref('periodStartDate')).required().messages({
                'date.min': 'The period end date must be after the start date.',
            }),            
            basicSalary: Joi.number().min(0).required(),
            allowance: Joi.number().min(0).default(0).required(),
            deduction: Joi.number().min(0).default(0),
            netSalary: Joi.number().min(0).required(),
        });

        const payrollData = req.body;

        // Validate payrollData using the Joi schema
        const { error } = payrollSchema.validate(payrollData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const employee = await Employee.findOne({ employeeID: payrollData.employeeID });
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found.' });
        }

        // Retrieve attendance records for the employee
        const attendanceRecords = await Attendance.find({ employeeID: payrollData.employeeID }).exec();

        // Calculate the number of absences
        const numberOfAbsences = await calculateAbsences(attendanceRecords);

        // Calculate deduction and salary
        const salaryPerDay = payrollData.basicSalary / 30;
        const deduction = payrollData.deduction + salaryPerDay * numberOfAbsences;
        const salary = payrollData.salary + payrollData.allowance - payrollData.deduction;

        payrollData.deduction = deduction;
        payrollData.salary = salary;
        
        // Create a new payroll document
        const createdPayroll = await Payroll.create(payrollData);
        res.status(200).json(createdPayroll);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Joi schema for payroll validation
const payrollSchema = Joi.object({
  payrollID: Joi.string(),
  employeeID: Joi.string(),
  salary: Joi.number().min(0),
  periodStartDate: Joi.date(),
  periodEndDate: Joi.date().min(Joi.ref('periodStartDate')).required().messages({
    'date.min': 'The period end date must be after the start date.',
    }),   
  basicSalary: Joi.number().min(0),
  allowance: Joi.number().min(0).default(0),
  deduction: Joi.number().min(0).default(0),
  netSalary: Joi.number().min(0),
}).min(1); // At least one field must be present

// Update a payroll
const updatePayroll = async (req, res) => {
  try {
    const payrollId = req.params.payrollId;
    const updatedPayrollData = req.body;

    // Validate updatedPayrollData using the Joi schema
    const { error } = payrollSchema.validate(updatedPayrollData);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find the payroll document by ID
    const payroll = await Payroll.findById(payrollId);

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found.' });
    }

    // Update the payroll document with the new data
    Object.assign(payroll, updatedPayrollData);
    await payroll.save();

    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single payroll by ID
const getPayrollByID = async (req, res) => {
    try {
      const payrollID = req.body._id;
  
      // Find the payroll document by ID
      const payroll = await Payroll.findById(payrollID);
  
      if (!payroll) {
        return res.status(404).json({ message: 'Payroll not found.' });
      }
  
      res.status.json(payroll);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  

// Get all payrolls
const getAllPayrolls = async (req, res) => {
    try {
        // Fetch all payrolls
        const payrolls = await Payroll.find();

        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a payroll
const deletePayroll = async (req, res) => {
    try {
      const payrollID = req.body._id;
  
      // Find the payroll document by ID
      const payroll = await Payroll.findById(payrollID);
  
      if (!payroll) {
        return res.status(404).json({ message: 'Payroll not found.' });
      }
  
      // Delete the payroll document
      await payroll.remove();
  
      res.status(200).json({ message: 'Payroll deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getAllPayrolls,
    createNewPayroll,
    updatePayroll,
    deletePayroll,
    getPayrollByID
}