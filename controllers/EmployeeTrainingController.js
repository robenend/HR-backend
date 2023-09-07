const EmployeeTraining = require("../models/employeeTraining");
const Joi = require('joi');

const getAllEmpTrainings = async (req, res) => {
  const empTraining = await EmployeeTraining.find();
  if (!empTraining)
    return res.status(204).json({ message: "No Training Employees found." });

  res.json(empTraining);
};

const createNewEmpTraining = async (req, res) => {

  try {
    // Define the Joi schema for validation
    const schema = Joi.object({
      employeeID: Joi.string().required(),
      trainer: Joi.string().optional(),
      startDate: Joi.date().required().greater('now').message('The start date must not be before today.'),
      endDate: Joi.date().required().min(Joi.ref('startDate')).messages({
        'date.min': 'The end date must be after the start date.',
      }),
      trainingName: Joi.string().required(),
      description: Joi.string().required(),
    });

    // Validate the employeeTrainingData using the Joi schema
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if(!mongoose.Types.ObjectId.isValid(value.employeeID)){
      return res.status(400).json({ message : 'Invalid employeeID'})
    }
      
    if(!mongoose.Types.ObjectId.isValid(value.trainer)){
      return res.status(400).json({ message : 'Invalid trainer'})
    }

    // Create a new EmployeeTraining document
    const employeeTraining = new EmployeeTraining(value);

    // Save the document to the database
    const savedEmployeeTraining = await employeeTraining.save();

    res.status(201).json(savedEmployeeTraining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEmpTraining = async (req, res) => {

  try {
    const id = req.body._id; // Assuming the id of the document is provided in the request parameters
    const empTraining = await EmployeeTraining.findById(id);
  
    if (!empTraining) {
      return res.status(404).json({ message: 'EmployeeTraining not found' });
    }

    // Define the Joi schema for validation
    const schema = Joi.object({
      employeeID: Joi.string().optional(),
      trainer: Joi.string().optional(),
      startDate: Joi.date().optional(),
      endDate: Joi.date().optional().min(Joi.ref('startDate')).messages({
        'date.min': 'The end date must be after the start date.',
      }),
      trainingName: Joi.string().optional(),
      description: Joi.string().optional(),
    });

    // Validate the employeeTrainingData using the Joi schema
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Find the EmployeeTraining document by ID and update its fields
    const updatedEmployeeTraining = await EmployeeTraining.findByIdAndUpdate(
      id,
      value,
      { new: true }
    );

    res.json(updatedEmployeeTraining);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getEmpTraining = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ message: "employeeTraining _id required." });

  const result = await EmployeeTraining.findById(req.body._id);

  if (!result) {
    return res.status(204).json({ message: `No Employee Training matches _id ${req.body._id}.` });
  }

  res.status(200).json(result);
};

const deleteEmpTraining = async (req, res) => {
  try {
    const id = req.body._id; // Assuming the id of the document is provided in the request parameters

    // Find the EmployeeTraining document by ID and delete it
    const deletedEmployeeTraining = await EmployeeTraining.findByIdAndDelete(id);

    if (!deletedEmployeeTraining) {
      return res.status(404).json({ message: 'EmployeeTraining not found' });
    }

    res.json({ message: 'EmployeeTraining deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEmpTrainings,
  createNewEmpTraining,
  updateEmpTraining,
  deleteEmpTraining,
  getEmpTraining,
};
