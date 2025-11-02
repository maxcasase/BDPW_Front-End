// /src/api/userApi.ts

import api from '../lib/axios';
import type { IUser } from '../interfaces/user.interfaces';
// (Podríamos necesitar 'IList' e 'IReview' aquí también en el futuro)

// 1. Definimos la respuesta del perfil público
// (Puede ser una versión simplificada de IUser)
export interface IUserProfile extends IUser {
  // Aquí el backend podría añadir listas, reseñas, conteo de seguidores, etc.
  followerCount: number;
  isFollowing: boolean; // Si el usuario logueado sigue a este perfil
}

// 2. Creamos la función API para obtener el perfil
export const getUserProfile = async (
  username: string
): Promise<IUserProfile> => {
  
  // Asumimos que el endpoint es '/users/profile/:username'
  const { data } = await api.get<IUserProfile>(`/users/profile/${username}`);
  return data;
};

// 3. (RF 46) Creamos la función para SEGUIR a un usuario
export const followUser = async (
  username: string
): Promise<{ success: boolean }> => {
  const { data } = await api.post(`/users/follow/${username}`);
  return data;
};

// 4. (RF 46) Creamos la función para DEJAR DE SEGUIR a un usuario
export const unfollowUser = async (
  username: string
): Promise<{ success: boolean }> => {
  const { data } = await api.delete(`/users/unfollow/${username}`);
  return data;
};