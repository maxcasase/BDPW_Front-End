// /src/api/authApi.ts

import api from '../lib/axios'; // Nuestra instancia de Axios
import { type IUser } from '../interfaces/user.interfaces'; // La interfaz de Usuario

// 1. Definimos los datos que necesita la función de login
// (El formulario nativo usa 'email' y 'password')
export interface ILoginCredentials {
  email: string;
  password: string;
}

// 2. Definimos la respuesta que esperamos del backend (token + usuario)
export interface ILoginResponse {
  token: string;
  user: IUser;
}

// 3. Definimos los datos para registro
export interface IRegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// 4. Definimos la respuesta del registro (igual que login)
export interface IRegisterResponse {
  token: string;
  user: IUser;
}

// 5. Función de login
export const loginUser = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  
  // Hacemos la llamada POST al endpoint '/v1/auth/login' (basado en RF 31)
  const { data } = await api.post<ILoginResponse>('/v1/auth/login', credentials);
  return data;
};

// 6. Función de registro
export const registerUser = async (
  credentials: IRegisterCredentials
): Promise<IRegisterResponse> => {
  
  // Hacemos la llamada POST al endpoint '/v1/auth/register'
  const { data } = await api.post<IRegisterResponse>('/v1/auth/register', credentials);
  return data;
};

// (En el futuro, aquí también podríamos añadir 'getCurrentUser', etc.)