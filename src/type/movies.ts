import type { RequestInfo, Video } from 'type/shared';

export interface Movies extends RequestInfo {
  results?: {
    poster_path?: string;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }[];
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Record<string, unknown> | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  release_date: string;
  revenue: number;
  poster_path?: string;
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline: string | null;
  title: string;
  video: boolean;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  videos?: {
    results: Video[];
  } | null;
  vote_average: number;
  vote_count: number;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
}
