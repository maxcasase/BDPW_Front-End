import { useQuery } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Genre } from '../interfaces/api';

export function useGenres(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['genres', page, limit],
    queryFn: async () => {
      const { data } = await http.get<Genre[]>('/api/genres', {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutos (géneros cambian poco)
  });
}

export function useGenre(id: string) {
  return useQuery({
    queryKey: ['genre', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Genre>(`/api/genres/${id}`);
      return data;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function usePopularGenres(limit = 10) {
  return useQuery({
    queryKey: ['genres', 'popular', limit],
    queryFn: async () => {
      const { data } = await http.get<Genre[]>('/api/genres/popular', {
        params: { limit }
      });
      return data;
    },
    staleTime: 20 * 60 * 1000,
  });
}

export function useGenreAlbums(genreId: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['genre', genreId, 'albums', page, limit],
    enabled: Boolean(genreId && genreId !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get(`/api/genres/${genreId}/albums`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}