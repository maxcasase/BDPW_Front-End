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

// 3. Creamos la función API asíncrona
// Esta es la función que llamará nuestro formulario
export const loginUser = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  
  // Hacemos la llamada POST al endpoint '/v1/auth/login' (basado en RF 31)
  const { data } = await api.post<ILoginResponse>('/v1/auth/login', credentials);
  return data;
};

// (En el futuro, aquí también podríamos añadir 'registerUser', 'getCurrentUser', etc.)