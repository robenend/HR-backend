const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Route: Create a new employee
router.post('/employees', employeeController.createEmployee);

// Route: Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Route: Get employee by ID or employeeID
router.get('/employees/:identifier', employeeController.getEmployeeById);

// Route: Update employee by ID
router.patch('/employees/:id', employeeController.updateEmployee);

// Route: Delete employee by ID
router.delete('/employees/:id', employeeController.deleteEmployee);

// Route: Get employee's position information
router.get('/employees/:id/position', employeeController.getPositionForEmployee);

// Route: Get employee's recruitment information
router.get('/employees/:id/recruitment', employeeController.getRecruitmentForEmployee);


// Filter employees 
router.get('/employees/filter', employeeController.filterEmployees);

// Search employees by name or Employee ID
router.post('/employees/search', employeeController.searchEmployee);

// Delete a document by passing employee ID and document ID
router.delete('/employees/:employeeId/documents/:documentId', employeeController.deleteDocumentByEmployeeAndDocumentId);

// Route: Get employee's rank information
router.get('/employees/:id/rank', employeeController.getRankForEmployee);

// Update employee's position
router.patch('/employees/:id/position', employeeController.updatePositionForEmployee);

// Route: Get employee's position information
router.get('/employees/:id/position', employeeController.getPositionForEmployee);


module.exports = router;
