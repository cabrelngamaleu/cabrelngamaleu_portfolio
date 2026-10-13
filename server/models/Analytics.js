const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: [true, "Le type d'événement est requis"],
      enum: ['page_view', 'project_click', 'contact_submit'],
    },
    page: {
      type: String,
      trim: true,
    },
    referrer: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Index for querying analytics
analyticsSchema.index({ event: 1, timestamp: -1 });
analyticsSchema.index({ page: 1, timestamp: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
