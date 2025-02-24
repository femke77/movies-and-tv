import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { IItem } from '../interfaces/IItem';
import { useEffect, useState } from 'react';

const fetchPopularMovies = async () => {
  const { data } = await TMDBClient.get('/movie/popular?language=en-US&page=1');
  return data.results;
};

export const usePopularMovies = () => {
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

    const target = document.getElementById('pop-section');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);
  return useQuery<IItem[], Error>({
    queryKey: ['popular-movies'],
    queryFn: fetchPopularMovies,
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


const fetchPopularTv = async () => {
  const { data } = await TMDBClient.get('/tv/popular?language=en-US&page=1');
  return data.results;
};

export const usePopularTv = () => {
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

    const target = document.getElementById('pop-tv-section');
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);
  return useQuery<IItem[], Error>({
    queryKey: ['popular-tv'],
    queryFn: fetchPopularTv,
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
