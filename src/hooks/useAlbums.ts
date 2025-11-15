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
    }
  });
}

export function useAlbum(id: string) {
  return useQuery({
    queryKey: ['album', id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await http.get<Album>(`/api/albums/${id}`);
      return data;
    }
  });
}
