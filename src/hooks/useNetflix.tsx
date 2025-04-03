import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createNetflixFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(
    `/discover/${type}?with_networks=213&language=en`
  );
  return data.results;
};

export const useNetflix = () => {
  const shouldFetch = useIntersectionObserver('netflix-section');
  return useQuery<IItem[], Error>(
    useQueryConfig('netflix', createNetflixFetcher('tv'), shouldFetch)
  );
};

