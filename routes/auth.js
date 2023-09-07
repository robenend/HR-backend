const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { verifyAdmin } = require('../middleware/verifyRole');
const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');
const refreshTokenController = require('../controllers/refreshTokenController');

router.get('/refresh', verifyJWT, refreshTokenController.handleRefreshToken);
router.post('/register', employeeController.createEmployee)
router.post('/login', authController.handleLogin);
router.get('/logout', authController.handleLogout);

module.exports = router;