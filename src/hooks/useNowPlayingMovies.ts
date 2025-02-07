import { TMDBClient } from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const fetchNowPlayingMovies = async () => {
 
    const response = await TMDBClient.get("/movie/now_playing");
    return response.data;
  
}
/**
 * Custom hook to fetch and return the list of now playing movies from TMDB.
 * Utilizes react-query's useQuery to manage the fetching state and caching.
 */

export const useNowPlayingMovies = () => {
    return useQuery({
      queryKey: ["now_playing_movies"],
      queryFn: fetchNowPlayingMovies,
      staleTime: 1000 * 60 * 60, // 60 minutes before refetch
      gcTime: 1000 * 60 * 70, // 70 minutes before garbage collection
      refetchOnWindowFocus: false, // Prevent unnecessary refetching
    });
  };
