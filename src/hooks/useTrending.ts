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

export const useTrendingMovies = () => {
  const shouldFetch = useIntersectionObserver('trending-section');
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'trending-movies',
      createTrendingFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const useTrendingTv = () => {
  const shouldFetch = useIntersectionObserver('trending-tv-section');
  return useQuery<IItem[], Error>(
    useQueryConfig('trending-tv', createTrendingFetcher('tv'), shouldFetch),
  );
};
