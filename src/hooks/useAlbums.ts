import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Album, PaginationParams, SearchParams } from '../interfaces/api';

// Listar álbumes con paginación
export function useAlbums(params: PaginationParams = {}) {
  const { page = 1, limit = 12 } = params;
  
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

// Obtener álbum específico
export function useAlbum(id: string) {
  return useQuery({
    queryKey: ['album', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Album>(`/api/albums/${id}`);
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
}

// Buscar álbumes
export function useSearchAlbums(params: SearchParams) {
  const { query, page = 1, limit = 12 } = params;
  
  return useQuery({
    queryKey: ['albums', 'search', query, page, limit],
    enabled: Boolean(query && query.trim().length > 0),
    queryFn: async () => {
      const { data } = await http.get<Album[]>('/api/albums/search', {
        params: { q: query, page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

// Álbumes de un artista específico
export function useArtistAlbums(artistId: string, params: PaginationParams = {}) {
  const { page = 1, limit = 12 } = params;
  
  return useQuery({
    queryKey: ['albums', 'artist', artistId, page, limit],
    enabled: Boolean(artistId),
    queryFn: async () => {
      const { data } = await http.get<Album[]>(`/api/artists/${artistId}/albums`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Álbumes por género
export function useGenreAlbums(genreId: string, params: PaginationParams = {}) {
  const { page = 1, limit = 12 } = params;
  
  return useQuery({
    queryKey: ['albums', 'genre', genreId, page, limit],
    enabled: Boolean(genreId),
    queryFn: async () => {
      const { data } = await http.get<Album[]>(`/api/genres/${genreId}/albums`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Hook para refrescar álbumes
export function useRefreshAlbums() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: ['albums'] });
  };
}