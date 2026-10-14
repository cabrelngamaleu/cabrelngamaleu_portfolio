const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blog.controller');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const Joi = require('joi');

// Validation schemas
const createBlogPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Le titre est requis',
    'any.required': 'Le titre est requis',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Le contenu est requis',
    'any.required': 'Le contenu est requis',
  }),
  excerpt: Joi.string().allow(''),
  tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  category: Joi.string().allow(''),
  published: Joi.boolean(),
});

const updateBlogPostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  excerpt: Joi.string().allow(''),
  tags: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  category: Joi.string().allow(''),
  published: Joi.boolean(),
});

// Public routes
router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);

// Protected routes (admin only)
router.post(
  '/',
  protect,
  admin,
  upload.single('coverImage'),
  validate(createBlogPostSchema),
  createBlogPost
);
router.put(
  '/:id',
  protect,
  admin,
  upload.single('coverImage'),
  validate(updateBlogPostSchema),
  updateBlogPost
);
router.delete('/:id', protect, admin, deleteBlogPost);

module.exports = router;
