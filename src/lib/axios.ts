// /src/lib/axios.ts

import axios from 'axios';
// Importaremos el 'store' de Zustand cuando lo creemos
// import { useAuthStore } from '../store/auth.store';

// 1. URL base de la API
// Esta será la dirección de tu backend en Node.js
// Usamos variables de entorno (.env) para cumplir con RNF 76 (entornos separados)
const API_BASE_URL = 'https://bd-y-pw.onrender.com/api';

// 2. Creación de la instancia de Axios
// Exportamos 'api' para usarla en toda la aplicación
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Interceptor de Solicitud (para enviar el Token JWT)
// Esto cumple con el RNF 70: "Las rutas protegidas deben requerir autenticación mediante tokens JWT"
api.interceptors.request.use(
  (config) => {
    // NOTA: Cuando creemos el store de Zustand, descomentaremos estas líneas
    // const token = useAuthStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;