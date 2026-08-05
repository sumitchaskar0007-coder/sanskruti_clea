import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

const unwrapResponseList = (response) => {
  const payload = response?.data ?? response;
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.data)) return payload.data;
  const arrayValues = Object.values(payload).filter((value) => Array.isArray(value));
  return arrayValues.length > 0 ? arrayValues[0] : [];
};

const unwrapResponseItem = (response) => {
  const payload = response?.data ?? response;
  if (payload === null || payload === undefined) return payload;
  if (Array.isArray(payload)) return payload;
  if (payload.data !== undefined && !Array.isArray(payload.data)) return payload.data;
  return payload;
};

export const authAPI = {
  login: (credentials) => API.post('/api/auth/login', credentials),
  verify: () => API.get('/api/auth/verify'),
};

export { unwrapResponseList, unwrapResponseItem };

export const galleryAPI = {
  getAll: () => API.get('/api/gallery'),
  create: (formData) =>
    API.post('/api/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/api/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/api/gallery/${id}`),
};

export const announcementsAPI = {
  getAll: () => API.get('/api/announcements'),
  create: (data) => API.post('/api/announcements', data),
  update: (id, data) => API.put(`/api/announcements/${id}`, data),
  delete: (id) => API.delete(`/api/announcements/${id}`),
};

export const careersAPI = {
  getAll: () => API.get('/api/careers'),
  create: (data) => API.post('/api/careers', data),
  update: (id, data) => API.put(`/api/careers/${id}`, data),
  delete: (id) => API.delete(`/api/careers/${id}`),
};

export const blogAPI = {
  // Public routes - Get all published blogs
  getAll: async () => {
    try {
      const response = await API.get('/api/blogs');
      // The backend returns { blogs: [], totalPages, currentPage, total }
      if (response.data && response.data.blogs) {
        return { data: response.data.blogs };
      }
      return response;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  getBySlug: (slug) => API.get(`/api/blogs/${slug}`),

  // Admin routes
  getAllAdmin: () => API.get('/api/blogs/admin/all'),
  getById: (id) => API.get(`/api/blogs/admin/${id}`),
  create: (formData) => API.post('/api/blogs', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  update: (id, formData) => API.put(`/api/blogs/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => API.delete(`/api/blogs/${id}`)
};

export const videosAPI = {
  // Public - active videos only
  getAll: async () => {
    try {
      const response = await API.get('/api/videos');
      if (response.data && response.data.videos) {
        return { data: response.data.videos };
      }
      return response;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  // Admin - all videos, including inactive
  getAllAdmin: async () => {
    try {
      const response = await API.get('/api/videos/admin/all');
      if (response.data && response.data.videos) {
        return { data: response.data.videos };
      }
      return response;
    } catch (error) {
      console.error('Error fetching admin videos:', error);
      throw error;
    }
  },

  getById: (id) => API.get(`/api/videos/admin/${id}`),

  // formData can include: title, description, videoType ('upload' | 'url'),
  // videoUrl (when videoType === 'url'), video (file, when videoType === 'upload'),
  // thumbnail (optional file), order
  create: (formData) =>
    API.post('/api/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/api/videos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/api/videos/${id}`),
};