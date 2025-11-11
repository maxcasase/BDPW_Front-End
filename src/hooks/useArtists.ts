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
    }
  });
}
