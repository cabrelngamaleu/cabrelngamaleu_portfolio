const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');

/**
 * Apply Helmet for secure HTTP headers
 */
const applyHelmet = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    crossOriginEmbedderPolicy: false,
  });
};

/**
 * Apply CORS with specific origin
 */
const applyCors = () => {
  return cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
};

/**
 * Apply MongoDB query sanitization
 * Prevents NoSQL injection attacks
 */
const applyMongoSanitize = () => {
  return mongoSanitize({
    replaceWith: '_',
  });
};

/**
 * Apply HTTP Parameter Pollution protection
 */
const applyHPP = () => {
  return hpp();
};

module.exports = {
  applyHelmet,
  applyCors,
  applyMongoSanitize,
  applyHPP,
};
