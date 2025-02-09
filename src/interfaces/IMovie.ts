export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];  
  title_logo?: string;
}
