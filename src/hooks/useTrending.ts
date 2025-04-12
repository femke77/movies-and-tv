import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createTrendingFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(`/trending/${type}/day?language=en-US`);
  return data.results;
};

export const useTrendingMovies = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'trending-movies',
      createTrendingFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const useTrendingTv = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig('trending-tv', createTrendingFetcher('tv'), shouldFetch),
  );
};
