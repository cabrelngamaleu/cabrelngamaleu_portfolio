const express = require('express');
const router = express.Router();
const { createEvent, getDashboard } = require('../controllers/analytics.controller');
const { protect, admin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schema for analytics event
const createEventSchema = Joi.object({
  event: Joi.string()
    .valid('page_view', 'project_click', 'contact_submit')
    .required()
    .messages({
      'any.only': "Type d'événement invalide",
      'any.required': "Le type d'événement est requis",
    }),
  page: Joi.string().allow(''),
  referrer: Joi.string().allow(''),
  userAgent: Joi.string().allow(''),
});

// Public route
router.post('/event', validate(createEventSchema), createEvent);

// Protected route (admin only)
router.get('/dashboard', protect, admin, getDashboard);

module.exports = router;
