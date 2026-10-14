const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * En test, on ne fait pas de process.exit pour laisser Jest gérer l'erreur
 * et permettre à mongodb-memory-server de prendre le relais.
 */
const connectDB = async (uri) => {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    const msg = 'MONGODB_URI non défini';
    if (process.env.NODE_ENV === 'test') throw new Error(msg);
    console.error(`❌ ${msg}`);
    process.exit(1);
  }
  try {
    // Mongoose 8+ : plus besoin de useNewUrlParser / useUnifiedTopology
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB connecté: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB: ${error.message}`);
    if (process.env.NODE_ENV === 'test') throw error;
    process.exit(1);
  }
};

module.exports = connectDB;
