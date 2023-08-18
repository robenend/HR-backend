const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const Position = require('../models/Position');
const Recruitment = require('../models/Recruitment');
const Department = require('../models/department');
const Document = require('../models/Document');

const employeeController = {
  // Create a new employee
  createEmployee: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const employeeData = req.body;
      const employee = new Employee(employeeData);
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
      const id = req.params.id;
      const updates = Object.keys(req.body);
      const allowedUpdates = ['firstName', 'lastName', 'email', 'positionID'];
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
      }

      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      updates.forEach(update => {
        employee[update] = req.body[update];
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
      const id = req.params.id;
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
    const employeeId = req.params.id;

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

  // Get employee's position information
  getPositionForEmployee: async (req, res) => {
    const employeeId = req.params.id;

    try {
      const employee = await Employee.findById(employeeId).populate('rankID');
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const rank = await Rank.findById(employee.rankID);
      if (!rank) {
        return res.status(404).send({ error: 'Rank not found' });
      }

      const position = await Position.findById(rank.PositionId);
      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }

      res.status(200).send(position);
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },

   // Update employee's position
  updatePositionForEmployee: async (req, res) => {
    const employeeId = req.params.id;
    const { positionId } = req.body;

    try {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).send({ error: 'Employee not found' });
      }

      const position = await Position.findById(positionId);
      if (!position) {
        return res.status(404).send({ error: 'Position not found' });
      }

      const rank = await Rank.findOne({ PositionId: positionId });
      if (!rank) {
        return res.status(404).send({ error: 'Rank not found for the given position' });
      }

      employee.positionID = positionId;
      await employee.save();

      res.status(200).send({ message: 'Position updated successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Server Error' });
    }
  },  

  // Get employee's recruitment information
  getRecruitmentForEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id;
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
