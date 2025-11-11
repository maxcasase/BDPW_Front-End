import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Review } from '../interfaces/api';

export function useAlbumReviews(albumId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['reviews', 'album', albumId, page, limit],
    enabled: Boolean(albumId),
    queryFn: async () => {
      const { data } = await http.get<Review[]>(`/api/reviews/album/${albumId}`, {
        params: { page, limit }
      });
      return data;
    }
  });
}

export function useCreateReview(albumId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { rating: number; title: string; content: string }) => {
      const { data } = await http.post('/api/reviews', { ...payload, album_id: albumId });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews', 'album', albumId] });
      qc.invalidateQueries({ queryKey: ['album', albumId] });
    }
  });
}
