// /src/store/notifications.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: number;
  tipo: 'comment' | 'reply' | 'like' | 'follow' | 'review';
  titulo: string;
  mensaje: string;
  fecha_creacion: string;
  leida: boolean;
  url?: string;
  usuario_origen?: {
    username: string;
    avatar_url?: string;
  };
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;
  
  // Acciones
  addNotification: (notification: Omit<Notification, 'id' | 'fecha_creacion' | 'leida'>) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  clearAll: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      addNotification: (notificationData) => {
        const newNotification: Notification = {
          ...notificationData,
          id: Date.now(),
          fecha_creacion: new Date().toISOString(),
          leida: false
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },

      markAsRead: (id) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (!notification || notification.leida) return state;

          return {
            notifications: state.notifications.map(n =>
              n.id === id ? { ...n, leida: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1)
          };
        });
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, leida: true })),
          unreadCount: 0
        }));
      },

      deleteNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          const wasUnread = notification && !notification.leida;

          return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
          };
        });
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      }
    }),
    {
      name: 'notifications-storage',
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount
      })
    }
  )
);
