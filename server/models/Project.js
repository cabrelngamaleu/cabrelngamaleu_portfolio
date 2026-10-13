const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre du projet est requis'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'desktop', 'fullstack', 'frontend', 'backend', 'autre'],
      required: [true, 'La catégorie est requise'],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: 'URL invalide',
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: 'URL invalide',
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting and filtering
projectSchema.index({ order: 1, createdAt: -1 });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });

module.exports = mongoose.model('Project', projectSchema);
