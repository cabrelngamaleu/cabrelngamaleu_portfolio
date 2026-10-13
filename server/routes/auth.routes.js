const express = require('express');
const router = express.Router();
const { login, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.put('/change-password', protect, changePassword);

module.exports = router;
