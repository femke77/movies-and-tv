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
  if (!data || !data.results) {
    throw new Error('No data found');
  }
  return data.results;
};

export const usePopularMovies = () => {
  const shouldFetch = useIntersectionObserver('pop-section');
  return useQuery<IItem[], Error>(
    useQueryConfig(
      'popular-movies',
      createPopularFetcher('movie'),
      shouldFetch,
    ),
  );
};

export const usePopularTv = () => {
  const shouldFetch = useIntersectionObserver('pop-tv-section');
  return useQuery<IItem[], Error>(
    useQueryConfig('popular-tv', createPopularFetcher('tv'), shouldFetch),
  );
};
