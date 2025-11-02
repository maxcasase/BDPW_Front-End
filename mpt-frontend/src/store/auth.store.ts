// /src/store/auth.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IUser } from '../interfaces/user.interfaces'; // <-- CORREGIDO (plural)

// Definimos la forma del estado
interface AuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  
  // Acciones (funciones para modificar el estado)
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
}

// Creamos el 'store' (almacén)
export const useAuthStore = create<AuthState>()(
  // 1. 'persist' envuelve nuestro 'store'
  persist(
    (set) => ({
      // Estado inicial
      token: null,
      user: null,
      isAuthenticated: false,

      // --- Definición de las Acciones ---

      // Acción para guardar el token
      setToken: (token: string) =>
        set({
          token: token,
          isAuthenticated: true,
        }),

      // Acción para guardar los datos del usuario
      setUser: (user: IUser) =>
        set({
          user: user,
        }),

      // Acción para cerrar sesión
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      // 3. Configuración de 'persist'
      name: 'auth-storage', // Nombre de la clave en localStorage
      partialize: (state) => ({ token: state.token }),
    }
  )
);