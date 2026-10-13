const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
} = require('../controllers/messages.controller');
const { protect, admin } = require('../middleware/auth');
const { contactLimiter } = require('../middleware/rateLimiter');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schema for contact message
const createMessageSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    'string.empty': 'Le nom est requis',
    'any.required': 'Le nom est requis',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'string.empty': "L'email est requis",
    'any.required': "L'email est requis",
  }),
  message: Joi.string().required().trim().messages({
    'string.empty': 'Le message est requis',
    'any.required': 'Le message est requis',
  }),
});

// Public route with stricter rate limiting
router.post('/', contactLimiter, validate(createMessageSchema), createMessage);

// Protected routes (admin only)
router.get('/', protect, admin, getMessages);
router.patch('/:id/read', protect, admin, toggleReadStatus);
router.delete('/:id', protect, admin, deleteMessage);

module.exports = router;
