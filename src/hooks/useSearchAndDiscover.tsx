
import { IItem } from '../interfaces/IItem';
import { TMDBClient } from '../utils/axiosConfig';
import { useInfiniteQuery } from '@tanstack/react-query';

// Search movie or tv show by any keyword or title

const searchResults = async ({ query = '', pageParam = 1 }) => {
  const { data } = await TMDBClient.get(
    `/search/multi?query=${query}&include_adult=false&language=en&page=${pageParam}`,
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteSearchQuery = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['infinite-search', query],
    queryFn: ({ pageParam }) => searchResults({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!query,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: page.results.filter(
          (item: IItem) => item.title || item.name || item.poster_path,
        ),
      })),
      pageParams: data.pageParams,
    }),
  });
};

// Discover new stuff

const discoverResults = async (
  type = 'movie',
  sort = 'popularity.desc',
  pageParam = 1,
  lang = 'en',
  genre = '',
  vote_average = 1,
) => {
  const { data } = await TMDBClient.get(
    `/discover/${type}?vote_average.gte=${vote_average}&include_adult=false&vote_count.gte=1000&language=${lang}&sort_by=${sort}&page=${pageParam}&genre=${genre}`,
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteDiscoverQuery = (
  type: string,
  sort: string,
  lang: string,
  vote_average?: number,
  genre?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['infinite-discover', type, sort, genre],
    queryFn: ({ pageParam }) =>
      discoverResults(type, sort, pageParam, lang, genre, vote_average),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
    staleTime: 0,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: page.results.filter(
          (item: IItem) => (item.title || item.name) || (item.poster_path),
        ),
      })),
      pageParams: data.pageParams,
    }),
  });
};


// trending movies 
// type can be 'all', 'movie', 'tv'
// time_window can be 'day', 'week'
const getTrending = async ({ type = 'all', time_window = "day", pageParam = 1 }) => {
  const { data } = await TMDBClient.get(
    `/trending/${type}/${time_window}?language=en-US&page=${pageParam}`,
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteTrendingQuery = (type?: string, time_window?: string) => {
  return useInfiniteQuery({
    queryKey: ['infinite-trending', type, time_window],
    queryFn: ({ pageParam }) => getTrending({ type, time_window, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: page.results.filter(
          (item: IItem) => item.title || item.name || item.poster_path,
        ),
      })),
      pageParams: data.pageParams,
    }),
  });
};