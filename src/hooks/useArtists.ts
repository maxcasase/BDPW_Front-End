import { useQuery } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Artist } from '../interfaces/api';

export function useArtists(page = 1, limit = 12) {
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

export function useArtist(id: string) {
  return useQuery({
    queryKey: ['artist', id],
    enabled: Boolean(id && id !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Artist>(`/api/artists/${id}`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchArtists(query: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['artists', 'search', query, page, limit],
    enabled: Boolean(query?.trim()),
    queryFn: async () => {
      const { data } = await http.get<Artist[]>('/api/artists/search', {
        params: { q: query, page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useTopArtists(limit = 10) {
  return useQuery({
    queryKey: ['artists', 'top', limit],
    queryFn: async () => {
      const { data } = await http.get<Artist[]>('/api/artists/top', {
        params: { limit }
      });
      return data;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useArtistAlbums(artistId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['artist', artistId, 'albums', page, limit],
    enabled: Boolean(artistId && artistId !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Artist[]>(`/api/artists/${artistId}/albums`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}