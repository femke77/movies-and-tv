import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createProviderFetcher =
  (type: 'movie' | 'tv', provider_id: number) => async () => {
    const { data } = await TMDBClient.get(
      `/discover/${type}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=${provider_id}`,
    );

    return data.results;
  };

export const useProvider = (
  type: 'movie' | 'tv',
  provider_name: string,
  provider_id: number,
  sectionRef: React.RefObject<HTMLElement>,
) => {
  const shouldFetch = useIntersectionObserver(sectionRef);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      provider_name,
      createProviderFetcher(type, provider_id),
      shouldFetch,
    ),
  );
};
