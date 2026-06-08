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

export const resolveImageUrl = (image) => {
    if (!image) return null;

    if (typeof image === 'string') {
        return getImageUrl(image);
    }

    if (typeof image === 'object') {
        if (image.url) {
            return getImageUrl(image.url);
        }

        if (image.data) {
            const data = image.data;
            if (Array.isArray(data) && data.length > 0) {
                const first = data[0];
                if (first?.attributes?.url) return getImageUrl(first.attributes.url);
                if (first?.url) return getImageUrl(first.url);
            }

            if (data.attributes?.url) {
                return getImageUrl(data.attributes.url);
            }

            if (data.url) {
                return getImageUrl(data.url);
            }
        }
    }

    return null;
};