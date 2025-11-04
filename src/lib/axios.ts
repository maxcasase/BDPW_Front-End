// /src/lib/axios.ts

import axios from 'axios';

// 1. URL base de la API
// Esta será la dirección de tu backend en Node.js
const API_BASE_URL = 'https://bd-y-pw.onrender.com/api';

// 2. Creación de la instancia de Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Interceptor de Solicitud (para enviar el Token JWT)
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Interceptor de Respuesta (para manejar errores de autenticación)
api.interceptors.response.use(
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

export default api;