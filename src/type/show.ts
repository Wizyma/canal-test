import { RequestInfo } from 'type/shared';

export interface Shows extends RequestInfo {
  results?: {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path?: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
  }[];
}

export interface Show {
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number
    profile_path: string
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[]
  homepage: string;
  id: number,
  in_production: boolean;
  languages: string[];
  last_air_date: string
  last_episode_to_air: {
    air_date: string
    episode_number: number
    id: number,
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number
    vote_count: number
  },
  name: string;
  next_episode_to_air: number
  networks: {
    name: string;
    id: string;
    logo_path: string;
    origin_country: string;
  }[],
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string,
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  seasons: {
    air_date: string
    episode_count: number
    id: number,
    name: string;
    overview: string;
    poster_path: string;
    season_number: number
  }[],
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
