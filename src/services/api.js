/**
 * API service for Nura Stays
 */
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/admin/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// ─── Public API ──────────────────────────────────────────────────────────────

export const propertyAPI = {
  getAll: (params) => api.get('/properties/', { params }),
  getFeatured: () => api.get('/properties/featured/'),
  getBySlug: (slug) => api.get(`/properties/${slug}/`),
};

export const reviewAPI = {
  getAll: (params) => api.get('/reviews/', { params }),
  getByProperty: (propertyId) => api.get(`/reviews/property/${propertyId}/`),
  getStats: () => api.get('/reviews/stats/'),
};

export const teamAPI = {
  getAll: () => api.get('/team/'),
};

export const contactAPI = {
  submit: (data) => api.post('/contact/', data),
};

// ─── Admin API ───────────────────────────────────────────────────────────────

export const adminAuthAPI = {
  login: (credentials) => api.post('/admin/login/', credentials),
  logout: (refresh) => api.post('/admin/logout/', { refresh }),
  verify: () => api.get('/admin/verify/'),
  dashboardStats: () => api.get('/admin/dashboard/stats/'),
};

export const adminPropertyAPI = {
  getAll: (params) => api.get('/admin/properties/', { params }),
  create: (data) => api.post('/admin/properties/', data),
  update: (id, data) => api.put(`/admin/properties/${id}/`, data),
  delete: (id) => api.delete(`/admin/properties/${id}/`),
  uploadImages: (id, formData) =>
    api.post(`/admin/properties/${id}/images/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteImage: (propId, imageId) =>
    api.delete(`/admin/properties/${propId}/images/${imageId}/`),
};

export const adminReviewAPI = {
  getAll: (params) => api.get('/admin/reviews/', { params }),
  create: (data) => api.post('/admin/reviews/', data),
  update: (id, data) => api.put(`/admin/reviews/${id}/`, data),
  delete: (id) => api.delete(`/admin/reviews/${id}/`),
};

export const adminTeamAPI = {
  getAll: () => api.get('/admin/team/'),
  create: (data) =>
    api.post('/admin/team/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, data) =>
    api.put(`/admin/team/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id) => api.delete(`/admin/team/${id}/`),
};

export default api;
