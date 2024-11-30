const { v2: cloudinary } = require('cloudinary');
const dotenv = require('dotenv');
dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

exports.uploadMedia = async (file) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: 'auto', // Automatically determines the type of file (image/video)
      transformation: [
        {
          width: 500,
          height: 500,
          crop: 'thumb',
          gravity: 'center',
          format: 'jpg',
          quality: 'auto',
        },
      ],
    });

    return uploadResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Image upload failed');
  }
};
exports.deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  } catch (error) {
    console.log(error);
  }
};
