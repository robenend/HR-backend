const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');
// const Position = require('../models/Position');
const Recruitment = require('../models/Recruitment');
// const Department = require('../models/Department');
const Document = require('../models/Document');
const Rank = require('../models/Rank');
const inputValidator = require('../helpers/inputValidator');
const Joi = require('joi');


const employeeController = {
  // Create a new employee
  createEmployee: async (req, res) => {
    try {

      const schema = Joi.object({
        employeeID: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        gender: Joi.string().required(),
        contactNumber: Joi.string().required(),
        role: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        employmentStatus: Joi.string().required(),
        rankID: Joi.string().required(),
        documents: Joi.array().items(Joi.string()),
        performanceRating: Joi.number().required(),
      });
      
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      
      // check for duplicate employeeID in the db
      const duplicate = await Employee.findOne({employeeID: value.employeeID }).exec();
      if (duplicate) return res.sendStatus(409); //Conflict 
         
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      if(!mongoose.Types.ObjectId.isValid(value.rankID)){
        return res.status(400).json({ message : 'Invalid rankID'})
      }

      if (value.documents && Array.isArray(value.documents)) {
        for (const document of documents) {
          if (!mongoose.Types.ObjectId.isValid(document)) {
            return res.status(400).json({ message: 'Invalid document' });
          }
        }
      }

      if(inputValidator.validateName(value.firstName)){

        return res.status(400).json({ message: 'Invalid first name' });
      }

      if (inputValidator.validateName(value.lastName)){
        return res.status(400).json({ message: 'Invalid last name' });

      }
      
      if(inputValidator.validateContactNumber(value.contactNumber)){
        return res.status(400).json({messge: 'Invalid contact Number.'})
      }

      if(inputValidator.validateEmail(value.email)){
        return res.status(400).json({messge: 'Invalid Email'})
      }

      //encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10);
      value.password = hashedPwd;

      const employee = new Employee(value);
      await employee.save();

      res.status(201).send(employee);
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get all employees
  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get employee by ID or employeeID
  getEmployeeById: async (req, res) => {
    const identifier = req.params.identifier;

    try {
      let employee;
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        employee = await Employee.findById(identifier);
      } else {
        employee = await Employee.findOne({ employeeID: identifier });
      }

      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      res.status(200).send(employee);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },


  // Update employee by ID
  updateEmployee: async (req, res) => {
    try {

      const schema = Joi.object({
        employeeID: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        dateOfBirth: Joi.date(),
        gender: Joi.string(),
        contactNumber: Joi.string(),
        role: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        employmentStatus: Joi.string(),
        rankID: Joi.string(),
        documents: Joi.array().items(Joi.string()),
        performanceRating: Joi.number(),
      }).min(1);

      const id = req.body._id;
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const { error, value } = schema.validate(req.body, { abortEarly: false });
      
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }

      if(value.rankID && !mongoose.Types.ObjectId.isValid(value.rankID)){
        return res.status(400).json({ message : 'Invalid rankID'})
      }

      if (value.documents && Array.isArray(value.documents)) {
        for (const document of documents) {
          if (!mongoose.Types.ObjectId.isValid(document)) {
            return res.status(400).json({ message: 'Invalid document' });
          }
        }
      }

      if(value.firstName && inputValidator.validateName(value.firstName)){
        return res.status(400).json({ message: 'Invalid first name' });
      }

      if (inputValidator.validateName(value.lastName)){
        return res.status(400).json({ message: 'Invalid last name' });

      }
      
      if(value.contactNumber && inputValidator.validateContactNumber(value.contactNumber)){
        return res.status(400).json({messge: 'Invalid contact Number.'})
      }

      if(value.email && inputValidator.validateEmail(value.email)){
        return res.status(400).json({messge: 'Invalid Email'})
      }


      updates.forEach(update => {
        employee[update] = value[update];
      });

      await employee.save();
      res.status(200).send(employee);
    } catch (error) {
      console.log(error)
      res.status(400).send({ error: error.message });
    }
  },

  // Delete employee by ID
  deleteEmployee: async (req, res) => {
    try {
      const id = req.body._id;
      const employee = await Employee.findByIdAndDelete(id);

      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      res.status(200).send(employee);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get employee's rank information
  getRankForEmployee: async (req, res) => {
    const employeeId = req.body._id;

    try {
      const employee = await Employee.findById(employeeId).populate('rankID');
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const rank = await Rank.findById(employee.rankID);
      if (!rank) {
        return res.status(404).send({ error: 'Rank not found' });
      }

      res.status(200).send(rank);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

  // Get employee's recruitment information
  getRecruitmentForEmployee: async (req, res) => {
    try {
      const employeeId = req.body._id;
      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const recruitment = await Recruitment.findOne({ hiringManagerID: employee._id });
      if (!recruitment) {
        return res.status(404).send({ error: 'Recruitment not found' });
      }

      res.status(200).send(recruitment);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
  
  // Search employees by name, contact number, email, or Employee ID
  searchEmployee: async (req, res) => {
    try {
      const searchQuery = req.body.search;
      let employees = [];

      if (searchQuery) {
        employees = await Employee.find({
          $or: [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { lastName: { $regex: searchQuery, $options: 'i' } },
            { contactNumber: { $regex: '^' + searchQuery}},
            { email: { $regex: '^' + searchQuery, $options: 'i'}},
            { employeeID: { $regex: '^' + searchQuery, $options: 'i'}}, 
          ],
        });
      }

      if (employees.length === 0) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      res.status(200).send(employees);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Server Error' });
    }
  },


  // Filter employees
  filterEmployees: async (req, res) => {
    try {
      const filterOptions = req.query;

      const employees = await Employee.find(filterOptions);
      res.status(200).send(employees);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
  
  // Delete a document by passing employee ID and document ID
  deleteDocumentByEmployeeAndDocumentId: async (req, res) => {
    try {
      const employeeId = req.params.employeeId;
      const documentId = req.params.documentId;

      // Find the employee
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      // Remove the document reference from employee's documents array
      employee.documents = employee.documents.filter(
        docId => docId.toString() !== documentId
      );

      // Save the updated employee
      await employee.save();

      // Delete the document from the Document collection
      const document = await Document.findByIdAndDelete(documentId);
      if (!document) {
        return res.status(404).send({ error: 'Document not found' });
      }

      res.status(200).send({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },
};

module.exports = employeeController;
