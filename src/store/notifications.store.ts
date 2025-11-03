import { create } from 'zustand';
import { notificationsAPI } from '../api/client';

export interface INotification {
  id: string;
  type: 'review' | 'like' | 'follow' | 'system';
  title: string;
  body?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsState {
  items: INotification[];
  loading: boolean;
  error: string | null;
  fetchAll: (token: string) => Promise<void>;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchAll: async (token: string) => {
    try {
      set({ loading: true, error: null });
      const data: INotification[] = await notificationsAPI.list(token);
      set({ items: data, loading: false, error: null });
    } catch (e: any) {
      set({ loading: false, error: e?.message ?? 'Error cargando notificaciones' });
    }
  },

  markAllRead: () => {
    const items = get().items.map((n) => ({ ...n, read: true }));
    set({ items });
  },

  unreadCount: () => get().items.filter((n) => !n.read).length,
}));
