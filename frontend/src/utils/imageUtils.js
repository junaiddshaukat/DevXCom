import { backendUrl } from "../server";

// Utility function to get the correct image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Handle case where imagePath is an object with url property
  if (typeof imagePath === 'object' && imagePath.url) {
    return imagePath.url;
  }

  // Handle case where imagePath is not a string
  if (typeof imagePath !== 'string') {
    console.warn('getImageUrl: imagePath is not a string or object with url property:', imagePath);
    return null;
  }

  // If it's already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path (old format), prepend backend URL
  return `${backendUrl}${imagePath}`;
};

export default getImageUrl;
