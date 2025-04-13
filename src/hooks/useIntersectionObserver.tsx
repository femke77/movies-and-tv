import { useEffect, useState } from 'react';
import { IItem } from '../interfaces/IItem';
// import { filterMainPageResults } from '../utils/helpers';

export const useIntersectionObserver = (
  targetRef: React.RefObject<HTMLElement>,
) => {
  const [shouldFetch, setShouldFetch] = useState(false);

 
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '125px 0px' },
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [targetRef]);

 

  return shouldFetch;
};

export const useQueryConfig = (
  queryKey: string,
  queryFn: () => Promise<IItem[]>,
  enabled: boolean,
) => ({
  queryKey: [queryKey],
  queryFn,
  staleTime: 1000 * 60 * 60 * 24,
  gcTime: 1000 * 60 * 60 * 25,
  refetchOnWindowFocus: false,
  refetchInterval: 1000 * 60 * 30, // 30 minutes
  // placeholderData: (previousData: IItem[] | undefined) => previousData,
  enabled,
  retry: 2,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  // select: (data: IItem[]) => {
  //   return filterMainPageResults(data);
  // },
});
