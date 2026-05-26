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
  login: (credentials) => API.post('/auth/login', credentials),
  verify: () => API.get('/auth/verify'),
};

export { unwrapResponseList, unwrapResponseItem };

export const galleryAPI = {
  getAll: () => API.get('/gallery'),
  create: (formData) =>
    API.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, formData) =>
    API.put(`/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => API.delete(`/gallery/${id}`),
};

export const announcementsAPI = {
  getAll: () => API.get('/announcements'),
  create: (data) => API.post('/announcements', data),
  update: (id, data) => API.put(`/announcements/${id}`, data),
  delete: (id) => API.delete(`/announcements/${id}`),
};

export const careersAPI = {
  getAll: () => API.get('/careers'),
  create: (data) => API.post('/careers', data),
  update: (id, data) => API.put(`/careers/${id}`, data),
  delete: (id) => API.delete(`/careers/${id}`),
};


// Add this to your existing api.js file

export const blogAPI = {
  // Public routes
  getAll: () => API.get('/blogs'),
  getBySlug: (slug) => API.get(`/blogs/${slug}`),

  // Admin routes
  getAllAdmin: () => API.get('/blogs/admin/all'),
  getById: (id) => API.get(`/blogs/admin/${id}`),
  create: (formData) => API.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => API.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => API.delete(`/blogs/${id}`)
};