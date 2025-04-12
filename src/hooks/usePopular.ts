import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createPopularFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(
    `/${type}/popular?include_adult=false&include_video=falselanguage=en-US&page=1`,
  );

  return data.results;
};

export const usePopularMovies = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'popular-movies',
      createPopularFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const usePopularTv = (ref: React.RefObject<HTMLElement>) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig('popular-tv', createPopularFetcher('tv'), shouldFetch),
  );
};
