import { useQuery } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Artist, PaginationParams, SearchParams } from '../interfaces/api';

// Listar artistas
export function useArtists(params: PaginationParams = {}) {
  const { page = 1, limit = 20 } = params;
  
  return useQuery({
    queryKey: ['artists', page, limit],
    queryFn: async () => {
      const { data } = await http.get<Artist[]>('/api/artists', {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

// Obtener artista específico
export function useArtist(id: string) {
  return useQuery({
    queryKey: ['artist', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Artist>(`/api/artists/${id}`);
      return data;
    },
    staleTime: 15 * 60 * 1000,
  });
}

// Buscar artistas
export function useSearchArtists(params: SearchParams) {
  const { query, page = 1, limit = 20 } = params;
  
  return useQuery({
    queryKey: ['artists', 'search', query, page, limit],
    enabled: Boolean(query && query.trim().length > 0),
    queryFn: async () => {
      const { data } = await http.get<Artist[]>('/api/artists/search', {
        params: { q: query, page, limit }
      });
      return data;
    },
    staleTime: 3 * 60 * 1000,
  });
}

// Top artistas (por rating o popularidad)
export function useTopArtists(limit: number = 10) {
  return useQuery({
    queryKey: ['artists', 'top', limit],
    queryFn: async () => {
      const { data } = await http.get<Artist[]>('/api/artists/top', {
        params: { limit }
      });
      return data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
}

// Estadísticas de un artista
export function useArtistStats(artistId: string) {
  return useQuery({
    queryKey: ['artist', artistId, 'stats'],
    enabled: Boolean(artistId),
    queryFn: async () => {
      const { data } = await http.get(`/api/artists/${artistId}/stats`);
      return data;
    },
    staleTime: 15 * 60 * 1000,
  });
}