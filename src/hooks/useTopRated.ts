import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createTopRatedFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(
    `/${type}/top_rated?include_adult=false&include_video=false&language=en-US&page=1`,
  );
  return data.results;
};

export const useTopRatedMovies = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'toprated-movies',
      createTopRatedFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const useTopRatedTv = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig('toprated-tv', createTopRatedFetcher('tv'), shouldFetch),
  );
};
