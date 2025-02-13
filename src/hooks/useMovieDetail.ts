import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const fetchMovieDetail = async (movie_id: string) => {
  const { data } = await TMDBClient.get(`/movie/${movie_id}`);
  return data;
};

const fetchMovieRating = async (movie_id: string) => {
  const { data } = await TMDBClient.get(
    `/movie/${movie_id}/release_dates?language=en`,
  );
  const usRegion = data.results.find(
    (region: { iso_3166_1: string }) => region.iso_3166_1 === 'US',
  );
  const certification = usRegion?.release_dates[0]?.certification || 'N/A';
  return certification;
};

const fetchMovieCredits = async (movie_id: string) => {
  const { data } = await TMDBClient.get(`/movie/${movie_id}/credits`);
  return data;
};

export const useMovieDetail = (movie_id: string) => {
  return useQuery({
    queryKey: ['movie-detail', movie_id],
    queryFn: async () => {
      if (!movie_id) {
        throw new Error('Movie ID is required');
      }

      // concurrent
      const [movie, rating, credits] = await Promise.all([
        fetchMovieDetail(movie_id),
        fetchMovieRating(movie_id),
        fetchMovieCredits(movie_id),
      ]);

      return {
        ...movie,
        rating,
        ...credits,
      };
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!movie_id,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  });
};
