// /src/api/reviewsApi.ts

import api from '../lib/axios';

// Interfaces
export interface ICreateReviewData {
  album_id: number;
  rating: number;
  title: string;
  content: string;
}

export interface IReview {
  id: number;
  user_id: number;
  album_id: number;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  username?: string;
  profile_name?: string;
  avatar_url?: string;
  album_title?: string;
  artist_name?: string;
  cover_image?: string;
}

export interface IReviewsResponse {
  success: boolean;
  count: number;
  reviews: IReview[];
}

export interface ICreateReviewResponse {
  success: boolean;
  review: IReview;
}

// API Functions
export const createReview = async (reviewData: ICreateReviewData): Promise<ICreateReviewResponse> => {
  const { data } = await api.post<ICreateReviewResponse>('/v1/reviews', reviewData);
  return data;
};

export const getReviewsByAlbum = async (albumId: number, page = 1, limit = 10): Promise<IReviewsResponse> => {
  const { data } = await api.get<IReviewsResponse>(`/v1/reviews?album_id=${albumId}&page=${page}&limit=${limit}`);
  return data;
};

export const getUserReviews = async (page = 1, limit = 10): Promise<IReviewsResponse> => {
  const { data } = await api.get<IReviewsResponse>(`/v1/reviews/me?page=${page}&limit=${limit}`);
  return data;
};

export const deleteReview = async (reviewId: number): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.delete<{ success: boolean; message: string }>(`/v1/reviews/${reviewId}`);
  return data;
};