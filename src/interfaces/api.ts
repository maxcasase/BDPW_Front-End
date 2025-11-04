// Interfaces para la API MongoDB

export interface Album {
  _id: string;
  title: string;
  artist_id: string;
  release_year: number;
  genre_id: string;
  cover_image?: string;
  discogs_release_id?: number;
  total_tracks: number;
  duration: number;
  average_rating: number;
  total_ratings: number;
  created_at: string;
  // Campos agregados por $lookup
  artist_name?: string;
  genre_name?: string;
}

export interface Artist {
  _id: string;
  name: string;
  bio?: string;
  image_url?: string;
  created_at: string;
  // Stats agregadas
  albums_count?: number;
  avg_rating?: number;
  total_ratings?: number;
}

export interface Genre {
  _id: string;
  name: string;
  description?: string;
  created_at: string;
  // Stats agregadas
  albums_count?: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  profile_name?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Review {
  _id: string;
  user_id: string;
  album_id: string;
  rating: number;
  title: string;
  content: string;
  likes_count: number;
  dislikes_count: number;
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

export interface CreateReviewData {
  album_id: string;
  rating: number;
  title: string;
  content: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total?: number;
    hasMore?: boolean;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}