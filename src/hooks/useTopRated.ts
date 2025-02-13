import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IMovie } from '../interfaces/IMovie';
import { useEffect, useState } from 'react';

const fetchTopRatedMovies = async () => {
  const { data } = await TMDBClient.get('/movie/top_rated');
  return data.results;
};

export const useTopRatedMovies = () => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-150px 150px' },
    );

    const target = document.getElementById('top-section');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);
  return useQuery<IMovie[], Error>({
    queryKey: ['toprated-movies'],
    queryFn: fetchTopRatedMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    enabled: shouldFetch,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
    placeholderData: (previousData) => previousData,
  });
};
