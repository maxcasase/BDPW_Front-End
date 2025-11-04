import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Review, CreateReviewData } from '../interfaces/api';

export function useReviews(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['reviews', page, limit],
    queryFn: async () => {
      const { data } = await http.get<Review[]>('/api/reviews', {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useAlbumReviews(albumId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['reviews', 'album', albumId, page, limit],
    enabled: Boolean(albumId && albumId !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Review[]>(`/api/reviews/album/${albumId}`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 1 * 60 * 1000,
  });
}

export function useUserReviews(userId: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['reviews', 'user', userId, page, limit],
    enabled: Boolean(userId && userId !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Review[]>(`/api/reviews/user/${userId}`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useRecentReviews(limit = 10) {
  return useQuery({
    queryKey: ['reviews', 'recent', limit],
    queryFn: async () => {
      const { data } = await http.get<Review[]>('/api/reviews/recent', {
        params: { limit }
      });
      return data;
    },
    staleTime: 30 * 1000, // 30 segundos
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewData: CreateReviewData) => {
      const { data } = await http.post<Review>('/api/reviews', reviewData);
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidar quéries relacionadas
      queryClient.invalidateQueries({ queryKey: ['reviews', 'album', variables.album_id] });
      queryClient.invalidateQueries({ queryKey: ['album', variables.album_id] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'recent'] });
    },
  });
}

export function useUpdateReview(reviewId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewData: Partial<CreateReviewData>) => {
      const { data } = await http.put<Review>(`/api/reviews/${reviewId}`, reviewData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'album', data.album_id] });
      queryClient.invalidateQueries({ queryKey: ['album', data.album_id] });
    },
  });
}

export function useDeleteReview(reviewId: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await http.delete(`/api/reviews/${reviewId}`);
    },
    onSuccess: () => {
      // Invalidar todas las reviews (no sabemos el album_id aquí)
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}