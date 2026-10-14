const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Validate required environment variables
 */
const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'FRONTEND_URL'];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Variables d'environnement manquantes: ${missing.join(', ')}`);
    console.error('Veuillez créer un fichier .env basé sur .env.example');
    process.exit(1);
  }
};

module.exports = { validateEnv };
