const Project = require('../models/Project');
const { uploadToCloudinary } = require('../config/cloudinary');
const fs = require('fs').promises;

/**
 * @desc    Get all projects
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (featured !== undefined) filter.featured = featured === 'true';

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des projets',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du projet',
      error: error.message,
    });
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/projects
 * @access  Private/Admin
 */
const createProject = async (req, res) => {
  try {
    let imageUrl = '';

    // Upload image to Cloudinary if provided
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path, 'portfolio/projects');
      // Delete temporary file
      await fs.unlink(req.file.path);
    }

    const projectData = {
      ...req.body,
      ...(imageUrl && { imageUrl }),
    };

    // Parse technologies array if it's a string
    if (typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du projet',
      error: error.message,
    });
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/projects/:id
 * @access  Private/Admin
 */
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé',
      });
    }

    const updateData = { ...req.body };

    // Upload new image if provided
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.path, 'portfolio/projects');
      updateData.imageUrl = imageUrl;
      // Delete temporary file
      await fs.unlink(req.file.path);
    }

    // Parse technologies array if it's a string
    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies.split(',').map(t => t.trim());
    }

    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du projet',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/projects/:id
 * @access  Private/Admin
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé',
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Projet supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du projet',
      error: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
