import { backendUrl } from "../server";

// Utility function to get the correct image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If it's already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it's a relative path (old format), prepend backend URL
  return `${backendUrl}${imagePath}`;
};

export default getImageUrl;
