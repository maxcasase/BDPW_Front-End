import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../lib/http';
import type { Review, CreateReviewRequest, PaginationParams } from '../interfaces/api';

// Reseñas de un álbum
export function useAlbumReviews(albumId: string, params: PaginationParams = {}) {
  const { page = 1, limit = 10 } = params;
  
  return useQuery({
    queryKey: ['reviews', 'album', albumId, page, limit],
    enabled: Boolean(albumId && albumId !== 'undefined'),
    queryFn: async () => {
      const { data } = await http.get<Review[]>(`/api/reviews/album/${albumId}`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

// Reseñas de un usuario
export function useUserReviews(userId: string, params: PaginationParams = {}) {
  const { page = 1, limit = 10 } = params;
  
  return useQuery({
    queryKey: ['reviews', 'user', userId, page, limit],
    enabled: Boolean(userId),
    queryFn: async () => {
      const { data } = await http.get<Review[]>(`/api/reviews/user/${userId}`, {
        params: { page, limit }
      });
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

// Reseñas recientes (homepage, charts)
export function useRecentReviews(limit: number = 10) {
  return useQuery({
    queryKey: ['reviews', 'recent', limit],
    queryFn: async () => {
      const { data } = await http.get<Review[]>('/api/reviews/recent', {
        params: { limit }
      });
      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minuto
  });
}

// Top reviewers
export function useTopReviewers(limit: number = 10) {
  return useQuery({
    queryKey: ['reviews', 'top-reviewers', limit],
    queryFn: async () => {
      const { data } = await http.get<any[]>('/api/reviews/top-reviewers', {
        params: { limit }
      });
      return data;
    },
    staleTime: 15 * 60 * 1000, // 15 minutos
  });
}

// Crear reseña
export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: CreateReviewRequest) => {
      const { data } = await http.post<Review>('/api/reviews', payload);
      return data;
    },
    onSuccess: (newReview) => {
      // Invalidar cache relacionado
      queryClient.invalidateQueries({ queryKey: ['reviews', 'album', newReview.album_id] });
      queryClient.invalidateQueries({ queryKey: ['album', newReview.album_id] }); // Refrescar rating
      queryClient.invalidateQueries({ queryKey: ['reviews', 'recent'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'user', newReview.user_id] });
    }
  });
}

// Actualizar reseña
export function useUpdateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reviewId, ...payload }: { reviewId: string } & CreateReviewRequest) => {
      const { data } = await http.put<Review>(`/api/reviews/${reviewId}`, payload);
      return data;
    },
    onSuccess: (updatedReview) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', 'album', updatedReview.album_id] });
      queryClient.invalidateQueries({ queryKey: ['album', updatedReview.album_id] });
      queryClient.invalidateQueries({ queryKey: ['reviews', 'user', updatedReview.user_id] });
    }
  });
}

// Eliminar reseña
export function useDeleteReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId: string) => {
      await http.delete(`/api/reviews/${reviewId}`);
      return reviewId;
    },
    onSuccess: (_, reviewId) => {
      // Invalidar todo el cache de reviews para simplicidad
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['albums'] });
    }
  });
}

// Like/Dislike review
export function useLikeReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await http.post(`/api/reviews/${reviewId}/like`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });
}

export function useDislikeReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (reviewId: string) => {
      const { data } = await http.post(`/api/reviews/${reviewId}/dislike`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });
}

// Verificar si usuario ya reseñó álbum
export function useUserAlbumReview(userId: string, albumId: string) {
  return useQuery({
    queryKey: ['review', 'user-album', userId, albumId],
    enabled: Boolean(userId && albumId),
    queryFn: async () => {
      try {
        const { data } = await http.get<Review>(`/api/reviews/check/${userId}/${albumId}`);
        return data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null; // No existe reseña
        }
        throw error;
      }
    },
    staleTime: 1 * 60 * 1000,
  });
}