import { TMDBClient } from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const fetchNowPlayingMovies = async () => {
  try {
    const response = await TMDBClient.get("/movie/now_playing");
    return response.data;
  } catch (error) {
    console.error("Error fetching now playing movies: ", error);
    throw new Error("Error fetching now playing movies");
  }
}
/**
 * Custom hook to fetch and return the list of now playing movies from TMDB.
 * Utilizes react-query's useQuery to manage the fetching state and caching.
 */

export const useNowPlayingMovies = () => {
  return useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: fetchNowPlayingMovies,
  });
};
