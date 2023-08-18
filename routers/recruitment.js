const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitmentController');

// Create a new recruitment
router.post('/recruitments', recruitmentController.createRecruitment);

// Get all recruitments
router.get('/recruitments', recruitmentController.getAllRecruitments);

// Get recruitment by ID
router.get('/recruitments/:id', recruitmentController.getRecruitmentById);

// Update recruitment by ID
router.patch('/recruitments/:id', recruitmentController.updateRecruitment);

// Delete recruitment by ID
router.delete('/recruitments/:id', recruitmentController.deleteRecruitment);

// Get position for a recruitment
router.get('/recruitments/:id/position', recruitmentController.getPositionForRecruitment);

// ... additional routes for relationship handling ...

module.exports = router;
