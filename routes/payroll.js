const express = require('express');
const router = express.Router();
const PayrollController = require('../controllers/PayrollController');

// Create a new position
router.post('/payroll', PayrollController.createNewPayroll);

// Get all positions
router.get('/payroll', PayrollController.getAllPayrolls);

// Get position by ID
router.get('/payroll/:id', PayrollController.getPayroll)

// Update position by ID
router.patch('/payroll/:id', PayrollController.updatePayroll);

// Delete position by ID
router.delete('/payroll/:id', PayrollController.deletePayroll);

module.exports = router;
