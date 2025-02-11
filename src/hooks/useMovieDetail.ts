import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const fetchMovieDetail = async (movie_id: string) => {
  const { data } = await TMDBClient.get(`/movie/${movie_id}`);
  return data;
};

export const useMovieDetail = (movie_id: string) => {
  return useQuery({
    queryKey: ['movie-detail', movie_id],
    queryFn: () => {
      if (!movie_id) {
        throw new Error('Movie ID is required');
      }
      return fetchMovieDetail(movie_id);
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!movie_id,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  });
};
