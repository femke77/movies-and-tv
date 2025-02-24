import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import { useEffect, useState } from 'react';

// TODO finish this refactor in other two Home hook files
const useIntersectionObserver = (targetId: string) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { threshold: 0.0, rootMargin: '50px 0px' },
    );

    const target = document.getElementById(targetId);
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [targetId]);

  return shouldFetch;
};

const createTrendingFetcher = (type: 'movie' | 'tv') => async () => {
  const { data } = await TMDBClient.get(`/trending/${type}/day?language=en-US`);
  return data.results;
};

const useQueryConfig = (queryKey: string, queryFn: () => Promise<IItem[]>, enabled: boolean) => ({
  queryKey: [queryKey],
  queryFn,
  staleTime: 1000 * 60 * 60 * 24, // 24 hours
  gcTime: 1000 * 60 * 60 * 25, // 25 hours
  refetchOnWindowFocus: false,
  refetchInterval: 1000 * 60 * 30, // 30 minutes
  enabled,
  retry: 2,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  placeholderData: (previousData: any) => previousData,
});

export const useTrendingMovies = () => {
  const shouldFetch = useIntersectionObserver('trending-section');
  return useQuery<IItem[], Error>(useQueryConfig('trending-movies', createTrendingFetcher('movie'), shouldFetch));
};

export const useTrendingTv = () => {
  const shouldFetch = useIntersectionObserver('trending-tv-section');
  return useQuery<IItem[], Error>(useQueryConfig('trending-tv', createTrendingFetcher('tv'), shouldFetch));
};
