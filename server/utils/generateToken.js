const jwt = require('jsonwebtoken');

/**
 * Generate JWT token for authenticated user
 * @param {String} userId - User ID
 * @returns {String} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '24h',
    }
  );
};

module.exports = generateToken;
