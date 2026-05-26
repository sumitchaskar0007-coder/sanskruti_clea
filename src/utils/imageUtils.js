// frontend/src/utils/imageUtils.js
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Get base URL from environment
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5010/api';

    // Remove /api from baseUrl if present to avoid double /api
    const baseUrlWithoutApi = baseUrl.replace('/api', '');

    // Ensure imagePath starts with /uploads
    const cleanImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    return `${baseUrlWithoutApi}${cleanImagePath}`;
};