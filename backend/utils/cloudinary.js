const cloudinary = require('cloudinary').v2;

// Upload image to Cloudinary
const uploadToCloudinary = async (fileBuffer, filename, folder = 'uploads') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                folder: folder,
                public_id: filename,
                overwrite: true,
                transformation: [
                    { width: 1000, height: 1000, crop: 'limit' },
                    { quality: 'auto' }
                ]
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        
        uploadStream.end(fileBuffer);
    });
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
};
