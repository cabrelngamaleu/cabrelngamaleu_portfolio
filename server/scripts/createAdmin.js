require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Create default admin user if no users exist
 */
const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connecté à MongoDB');

    // Check if any users exist
    const userCount = await User.countDocuments();

    if (userCount > 0) {
      console.log(`ℹ️  ${userCount} utilisateur(s) déjà existant(s)`);
      process.exit(0);
    }

    // Create default admin user
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'admin',
    });

    console.log('✅ Utilisateur admin créé avec succès');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Mot de passe: admin123');
    console.log('⚠️  IMPORTANT: Changez le mot de passe après la première connexion!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

createAdmin();
