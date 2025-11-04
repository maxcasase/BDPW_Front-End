import { useQuery } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Album } from '../interfaces/api';

export function useAlbums(page = 1, limit = 12) {
  return useQuery({
    queryKey: ['albums', page, limit],
    queryFn: async () => {
      const { data } = await http.get<Album[]>('/api/albums', {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

export function useAlbum(id: string) {
  return useQuery({
    queryKey: ['album', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Album>(`/api/albums/${id}`);
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

export function useSearchAlbums(query: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['albums', 'search', query, page, limit],
    enabled: Boolean(query?.trim()),
    queryFn: async () => {
      const { data } = await http.get<Album[]>('/api/albums/search', {
        params: { q: query, page, limit }
      });
      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

export function useTopAlbums(limit = 10) {
  return useQuery({
    queryKey: ['albums', 'top', limit],
    queryFn: async () => {
      const { data } = await http.get<Album[]>('/api/albums/top', {
        params: { limit }
      });
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}