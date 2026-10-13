const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {String} filePath - Path to the file to upload
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<String>} Secure URL of uploaded image
 */
const uploadToCloudinary = async (filePath, folder = 'portfolio') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    throw new Error(`Erreur lors de l'upload de l'image: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Public ID of the image
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
};
