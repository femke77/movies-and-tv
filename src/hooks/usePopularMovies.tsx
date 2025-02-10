import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IMovie } from '../interfaces/IMovie';

const fetchPopularMovies = async () => {
  const { data } = await TMDBClient.get('/movie/popular');
  return data.results;
};

export const usePopularMovies = () => {
  return useQuery<IMovie[], Error>({
    queryKey: ['popular-movies'],
    queryFn: fetchPopularMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    placeholderData: (previousData) => previousData,
  });
};
