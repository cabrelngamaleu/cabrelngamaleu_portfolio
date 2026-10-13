const BlogPost = require('../models/BlogPost');
const { uploadToCloudinary } = require('../config/cloudinary');
const fs = require('fs').promises;
const slugify = require('slugify');

/**
 * @desc    Get all blog posts (published only for public)
 * @route   GET /api/blog
 * @access  Public
 */
const getBlogPosts = async (req, res) => {
  try {
    const { published } = req.query;
    
    // Default to published posts only for public access
    const filter = { published: published === 'false' ? false : true };

    const posts = await BlogPost.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single blog post by slug
 * @route   GET /api/blog/:slug
 * @access  Public
 */
const getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de l'article",
      error: error.message,
    });
  }
};

/**
 * @desc    Create new blog post
 * @route   POST /api/blog
 * @access  Private/Admin
 */
const createBlogPost = async (req, res) => {
  try {
    let coverImage = '';

    // Upload cover image to Cloudinary if provided
    if (req.file) {
      coverImage = await uploadToCloudinary(req.file.path, 'portfolio/blog');
      // Delete temporary file
      await fs.unlink(req.file.path);
    }

    // Auto-generate slug from title
    const slug = slugify(req.body.title, {
      lower: true,
      strict: true,
      locale: 'fr',
    });

    // Parse tags array if it's a string
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim());
    }

    const postData = {
      ...req.body,
      slug,
      tags,
      ...(coverImage && { coverImage }),
    };

    const post = await BlogPost.create(postData);

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    res.status(400).json({
      success: false,
      message: "Erreur lors de la création de l'article",
      error: error.message,
    });
  }
};

/**
 * @desc    Update blog post
 * @route   PUT /api/blog/:id
 * @access  Private/Admin
 */
const updateBlogPost = async (req, res) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé',
      });
    }

    let updateData = { ...req.body };

    // Upload new cover image if provided
    if (req.file) {
      const coverImage = await uploadToCloudinary(req.file.path, 'portfolio/blog');
      updateData.coverImage = coverImage;
      // Delete temporary file
      await fs.unlink(req.file.path);
    }

    // Update slug if title changed
    if (updateData.title && updateData.title !== post.title) {
      updateData.slug = slugify(updateData.title, {
        lower: true,
        strict: true,
        locale: 'fr',
      });
    }

    // Parse tags array if it's a string
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim());
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    res.status(400).json({
      success: false,
      message: "Erreur lors de la mise à jour de l'article",
      error: error.message,
    });
  }
};

/**
 * @desc    Delete blog post
 * @route   DELETE /api/blog/:id
 * @access  Private/Admin
 */
const deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé',
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Article supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'article",
      error: error.message,
    });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
