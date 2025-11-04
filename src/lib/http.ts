import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar JWT token si existe
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejo de errores
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default http;