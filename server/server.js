const express = require('express');
const path = require('path');
const fs = require('fs');

// Load and validate environment variables
require('./config/env');
const { validateEnv } = require('./config/env');
validateEnv();

// Database connection
const connectDB = require('./config/db');

// Security middleware
const {
  applyHelmet,
  applyCors,
  applyMongoSanitize,
  applyHPP,
} = require('./middleware/security');
const { generalLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/auth.routes');
const projectsRoutes = require('./routes/projects.routes');
const blogRoutes = require('./routes/blog.routes');
const messagesRoutes = require('./routes/messages.routes');
const analyticsRoutes = require('./routes/analytics.routes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply security middleware
app.use(applyHelmet());
app.use(applyCors());
app.use(applyMongoSanitize());
app.use(applyHPP());

// Rate limiting
app.use('/api', generalLimiter);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 handler for undefined routes
app.use(notFound);

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Erreur non gérée: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
