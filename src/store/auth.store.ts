import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type IUser } from '../interfaces/user.interfaces';
import { authAPI } from '../api/http';

interface AuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  initialized: boolean;

  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  initFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      initialized: false,

      setToken: (token: string) =>
        set({ token, isAuthenticated: true }),

      setUser: (user: IUser) => set({ user }),

      logout: () => set({ token: null, user: null, isAuthenticated: false }),

      initFromStorage: async () => {
        const token = get().token;
        if (!token) {
          set({ initialized: true });
          return;
        }
        try {
          const me = await authAPI.me(token);
          set({ user: me, isAuthenticated: true, initialized: true });
        } catch (e) {
          // Token inválido o backend caído: limpiar estado pero no romper la app
          set({ token: null, user: null, isAuthenticated: false, initialized: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);