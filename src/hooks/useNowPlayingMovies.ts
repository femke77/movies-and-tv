import { TMDBClient } from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import type { IMovie } from "../interfaces/IMovie";

interface ILogo {
    iso_639_1: string;
    file_path: string;
}

const fetchNowPlayingMovies = async (): Promise<IMovie[]> => {
  const response = await TMDBClient.get("/movie/now_playing");
  const movies = response.data.results;
  
  // Fetch logos for all movies
  const moviesWithLogos = await Promise.all(
    movies.map(async (movie: IMovie) => {
      const { data: images } = await TMDBClient.get(`/movie/${movie.id}/images`);
      const logo = images?.logos?.find((logo: ILogo) => logo.iso_639_1 === "en")?.file_path || null;
      return { ...movie, title_logo: logo };
    })
  );
  
  return moviesWithLogos;
};

export const useNowPlayingMovies = () => {
  return useQuery<IMovie[], Error>({
    queryKey: ["now_playing_movies"],
    queryFn: fetchNowPlayingMovies,
    staleTime: 1000 * 60 * 60, // 60 minutes
    gcTime: 1000 * 60 * 70, // 70 minutes
    refetchOnWindowFocus: false,
  });
};