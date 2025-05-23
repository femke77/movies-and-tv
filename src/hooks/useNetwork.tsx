import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createNetworkFetcher =
  (type: 'movie' | 'tv', network_id: number) => async () => {
    const { data } = await TMDBClient.get(
      `/discover/${type}?include_adult=false&include_video=false&with_networks=${network_id}&language=en&sort_by=popularity.desc`,
    );
    return data.results;
  };

export const useNetwork = (
  type: 'movie' | 'tv',
  network_name: string,
  network_id: number,
  ref: React.RefObject<HTMLElement>,
) => {
  const shouldFetch = useIntersectionObserver(ref);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      network_name,
      createNetworkFetcher(type, network_id),
      shouldFetch,
    ),
  );
};
