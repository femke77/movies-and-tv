import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import {
  useIntersectionObserver,
  useQueryConfig,
} from './useIntersectionObserver';

const createCompanyFetcher =
  (type: 'movie' | 'tv', company_id: number) => async () => {
    const { data } = await TMDBClient.get(
      `/discover/${type}?include_adult=false&include_video=false&with_companies=${company_id}&language=en`,
    );
    return data.results;
  };

export const useProductionCo = (
  type: 'movie' | 'tv',
  company_name: string,
  company_id: number,
) => {
  const shouldFetch = useIntersectionObserver(`${company_name}-section`);
  return useQuery<IItem[], Error>(
    useQueryConfig(
      company_name,
      createCompanyFetcher(type, company_id),
      shouldFetch,
    ),
  );
};
