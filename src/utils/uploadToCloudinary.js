const cloudinary = require('../config/cloudinary');

async function uploadToCloudinary(imageData, folder = 'employees') {
  try {
    if (imageData && (imageData.startsWith('http://') || imageData.startsWith('https://'))) {
      return imageData;
    }

    const result = await cloudinary.uploader.upload(imageData, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 500, height: 500, crop: 'limit' },
        { quality: 'auto' }
      ]
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

module.exports = { uploadToCloudinary };
