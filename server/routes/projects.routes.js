const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects.controller');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schemas
const createProjectSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Le titre est requis',
    'any.required': 'Le titre est requis',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'La description est requise',
    'any.required': 'La description est requise',
  }),
  longDescription: Joi.string().allow(''),
  technologies: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ),
  category: Joi.string()
    .valid('web', 'mobile', 'desktop', 'fullstack', 'frontend', 'backend', 'autre')
    .required()
    .messages({
      'any.only': 'Catégorie invalide',
      'any.required': 'La catégorie est requise',
    }),
  liveUrl: Joi.string().uri().allow(''),
  githubUrl: Joi.string().uri().allow(''),
  featured: Joi.boolean(),
  order: Joi.number().integer(),
});

const updateProjectSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  longDescription: Joi.string().allow(''),
  technologies: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string()
  ),
  category: Joi.string().valid('web', 'mobile', 'desktop', 'fullstack', 'frontend', 'backend', 'autre'),
  liveUrl: Joi.string().uri().allow(''),
  githubUrl: Joi.string().uri().allow(''),
  featured: Joi.boolean(),
  order: Joi.number().integer(),
});

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (admin only)
router.post(
  '/',
  protect,
  admin,
  upload.single('image'),
  validate(createProjectSchema),
  createProject
);
router.put(
  '/:id',
  protect,
  admin,
  upload.single('image'),
  validate(updateProjectSchema),
  updateProject
);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router;
