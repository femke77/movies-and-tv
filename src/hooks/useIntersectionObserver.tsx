import { useEffect, useState } from 'react';
import { IItem } from '../interfaces/IItem';

export const useIntersectionObserver = (targetId: string) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { threshold: 0.0, rootMargin: '100px 0px' },
    );

    const target = document.getElementById(targetId);
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [targetId]);

  return shouldFetch;
};

export const useQueryConfig = (
  queryKey: string,
  queryFn: () => Promise<IItem[]>,
  enabled: boolean,
) => ({
  queryKey: [queryKey],
  queryFn,
  staleTime: 1000 * 60 * 60 * 6, // 6 hours
  gcTime: 1000 * 60 * 370, // 6 hours and 10 min
  refetchOnWindowFocus: false,
  refetchInterval: 1000 * 60 * 30, // 30 minutes
  enabled,
  retry: 2,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  // placeholderData: (previousData: IItem[] | undefined) => previousData ?? [],
});
