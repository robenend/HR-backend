const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

// Create a new position
router.post('/positions', positionController.createPosition);

// Get all positions
router.get('/positions', positionController.getAllPositions);

// Get position by ID
router.get('/positions/:id', positionController.getPositionById);

// Update position by ID
router.patch('/positions/:id', positionController.updatePosition);

// Delete position by ID
router.delete('/positions/:id', positionController.deletePosition);

// Get employees for a position
router.get('/positions/:id/employees', positionController.getEmployeesForPosition);

// Get recruitments for a position
router.get('/positions/:id/recruitments', positionController.getRecruitmentsForPosition);

module.exports = router;
