// Interfaces para la API MongoDB

export interface Album {
  _id: string;
  title: string;
  artist_id: string;
  release_year: number;
  genre_id: string;
  cover_image?: string;
  discogs_release_id?: number;
  total_tracks?: number;
  duration?: number;
  average_rating?: number;
  total_ratings?: number;
  created_at?: string;
  // Campos agregados por $lookup
  artist_name?: string;
  genre_name?: string;
}

export interface Artist {
  _id: string;
  name: string;
  bio?: string;
  image_url?: string;
  created_at?: string;
  // Campos agregados por estadísticas
  albums_count?: number;
  avg_rating?: number;
  total_ratings?: number;
}

export interface Genre {
  _id: string;
  name: string;
  description?: string;
  created_at?: string;
  // Campos agregados por estadísticas
  albums_count?: number;
  artists_count?: number;
  average_rating?: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profile_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  // password_hash excluido por seguridad
}

export interface Review {
  _id: string;
  user_id: string;
  album_id: string;
  rating: number;
  title: string;
  content: string;
  likes_count?: number;
  dislikes_count?: number;
  created_at: string;
  updated_at: string;
  // Campos agregados por $lookup
  username?: string;
  profile_name?: string;
  avatar_url?: string;
  album_title?: string;
  cover_image?: string;
  artist_name?: string;
}

// Request/Response types
export interface CreateReviewRequest {
  album_id: string;
  rating: number;
  title: string;
  content: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SearchParams extends PaginationParams {
  query?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}