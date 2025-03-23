export interface IItem {
  id: number | string;
  title: string;
  poster_path: string;
  vote_average: number | null;
  backdrop_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  title_logo?: string;
  media_type?: string;
  name?: string;
  first_air_date?: string;
  isBookmarked?: boolean;
  original_name?: string;
}
