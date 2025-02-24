import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createTopRatedFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(
    `/${type}/top_rated?language=en-US&page=1`,
  );
  return data.results;
};

export const useTopRatedMovies = () => {
  const shouldFetch = useIntersectionObserver('top-section');
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'toprated-movies',
      createTopRatedFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const useTopRatedTv = () => {
  const shouldFetch = useIntersectionObserver('top-tv-section');
  return useQuery<IItem[], Error>(
    useQueryConfig('toprated-tv', createTopRatedFetcher('tv'), shouldFetch),
  );
};
