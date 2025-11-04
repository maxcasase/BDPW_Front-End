import { useQuery } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Genre, PaginationParams, SearchParams } from '../interfaces/api';

// Listar géneros
export function useGenres(params: PaginationParams = {}) {
  const { page = 1, limit = 20 } = params;
  
  return useQuery({
    queryKey: ['genres', page, limit],
    queryFn: async () => {
      const { data } = await http.get<Genre[]>('/api/genres', {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
}

// Obtener género específico
export function useGenre(id: string) {
  return useQuery({
    queryKey: ['genre', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Genre>(`/api/genres/${id}`);
      return data;
    },
    staleTime: 20 * 60 * 1000,
  });
}

// Géneros populares (más álbumes)
export function usePopularGenres(limit: number = 10) {
  return useQuery({
    queryKey: ['genres', 'popular', limit],
    queryFn: async () => {
      const { data } = await http.get<Genre[]>('/api/genres/popular', {
        params: { limit }
      });
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });
}

// Buscar géneros
export function useSearchGenres(params: SearchParams) {
  const { query, page = 1, limit = 20 } = params;
  
  return useQuery({
    queryKey: ['genres', 'search', query, page, limit],
    enabled: Boolean(query && query.trim().length > 0),
    queryFn: async () => {
      const { data } = await http.get<Genre[]>('/api/genres/search', {
        params: { q: query, page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Estadísticas de un género
export function useGenreStats(genreId: string) {
  return useQuery({
    queryKey: ['genre', genreId, 'stats'],
    enabled: Boolean(genreId),
    queryFn: async () => {
      const { data } = await http.get(`/api/genres/${genreId}/stats`);
      return data;
    },
    staleTime: 15 * 60 * 1000,
  });
}