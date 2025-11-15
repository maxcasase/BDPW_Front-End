export interface Album {
  _id: string;
  title: string;
  artist_id: string;
  release_year: number;
  genre_id: string;
  cover_image?: string;
  average_rating?: number;
  total_ratings?: number;
  artist_name?: string;
  genre_name?: string;
  created_at?: string;
}

export interface Artist {
  _id: string;
  name: string;
  bio?: string;
  image_url?: string;
  created_at?: string;
}

export interface Review {
  _id: string;
  user_id: string;
  album_id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  username?: string;
  profile_name?: string;
  avatar_url?: string;
  album_title?: string;
}
