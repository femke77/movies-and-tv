import { TMDBClient } from '../utils/axiosConfig';
import { useInfiniteQuery } from '@tanstack/react-query';
import { filterTMDBResults } from '../utils/helpers';
import { IItem } from '../interfaces/IItem';
import { ICast } from '../interfaces/ICast';

// All queries are paginated and return a nextPage and totalPages for infinite scroll

// Search items by query -includes person search by default
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
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    gcTime: 1000 * 60 * 60 * 65, // 65 minutes
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    select: (data) => {
      const filteredPages = data.pages.map((page) => ({
        ...page,
        results: page.results.filter(
          (item: IItem) => item.media_type !== 'person',
        ),
        persons: page.results.filter(
          (item: ICast) =>
            item.media_type === 'person' &&
            (item.known_for_department === 'Acting' ||
              item.known_for_department === 'Directing'),
        ),
      }));

      // make sure at least one item exists per page for pagination (no empty pages or Inf Query will stop)
      return {
        pages: filteredPages.filter(
          (page) => page.results.length > 0 || page.persons.length > 0,
        ),
        pageParams: data.pageParams,
      };
    },
  });
};

// Discover new items

const discoverResults = async (
  type = 'movie',
  genres = '',
  sort = 'popularity.desc',
  pageParam = 1,
  lang = 'en',
  voteAverage = 1,
  voteCount = 150,
  deselectedGenres = '',
) => {
  const { data } = await TMDBClient.get(
    `/discover/${type}?vote_average.gte=${voteAverage}&include_adult=false&vote_count.gte=${voteCount}&language=${lang}&sort_by=${sort}&page=${pageParam}&with_genres=${genres}&without_genres=${deselectedGenres}`,
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteDiscoverQuery = (
  type: string,
  genres?: string,
  sort?: string,
  lang?: string,
  voteAverage?: number,
  voteCount?: number,
  deselectedGenres?: string,
) => {
  return useInfiniteQuery({
    queryKey: [
      'infinite-discover',
      type,
      sort,
      genres,
      deselectedGenres,
      voteAverage,
      voteCount,
      lang,
    ],
    queryFn: ({ pageParam }) =>
      discoverResults(
        type,
        genres,
        sort,
        pageParam,
        lang,
        voteAverage,
        voteCount,
        deselectedGenres,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    gcTime: 1000 * 60 * 60 * 65, // 65min
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: filterTMDBResults(page.results),
      })),
      pageParams: data.pageParams,
    }),
    placeholderData: (previousData) => previousData,
  });
};

// Trending items
// type can be 'all', 'movie', 'tv'
// time_window can be 'day', 'week'
const getTrending = async ({
  type = 'all',
  time_window = 'week',
  pageParam = 1,
}) => {
  const { data } = await TMDBClient.get(
    `/trending/${type}/${time_window}?language=en-US&page=${pageParam}`,
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteTrendingQuery = (
  type?: string,
  time_window?: string,
) => {
  return useInfiniteQuery({
    queryKey: ['infinite-trending', type, time_window],
    queryFn: ({ pageParam }) => getTrending({ type, time_window, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    gcTime: 1000 * 60 * 60 * 65, // 65min
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      pages: data.pages.map((page) => ({
        ...page,
        results: filterTMDBResults(page.results),
      })),
      pageParams: data.pageParams,
    }),
  });
};
