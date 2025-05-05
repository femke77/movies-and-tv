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

      // make sure at least one item exists per page for pagination (no empty pages or inf query will stop)
      return {
        pages: filteredPages.filter(
          (page) => page.results.length > 0 || page.persons.length > 0,
        ),
        pageParams: data.pageParams,
      };
    },
  });
};

//////////////////////////// Discover new movies and shows  //////////////////////////////////////

const discoverResults = async (
  type = 'movie',
  genres = '',
  sort = 'popularity.desc',
  pageParam = 1,
  lang = 'en',
  voteAverage = 1,
  voteCount = 150,
  deselectedGenres = '',
  with_companies = '',
  with_networks = '',
  watch_providers = '',
  primary_release_date_gte = '',
  primary_release_date_lte = '',
  first_air_date_gte = '',
  first_air_date_lte = '',
) => {
  const { data } = await TMDBClient.get(
    `/discover/${type}?vote_average.gte=${voteAverage}&include_adult=false&vote_count.gte=${voteCount}&language=${lang}&sort_by=${sort}&page=${pageParam}&with_genres=${genres}&without_genres=${deselectedGenres}&with_companies=${with_companies}&with_networks=${with_networks}&with_watch_providers=${watch_providers}&watch_region=US&primary_release_date.gte=${primary_release_date_gte}&primary_release_date.lte=${primary_release_date_lte}&first_air_date.gte=${first_air_date_gte}&first_air_date.lte=${first_air_date_lte}`,
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
  with_companies?: string,
  with_networks?: string,
  watch_providers?: string,
  primary_release_date_gte?: string,
  primary_release_date_lte?: string,
  first_air_date_gte?: string,
  first_air_date_lte?: string,
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
      with_companies,
      with_networks,
      watch_providers,
      primary_release_date_gte,
      primary_release_date_lte,
      first_air_date_gte,
      first_air_date_lte,
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
        with_companies,
        with_networks,
        watch_providers,
        primary_release_date_gte,
        primary_release_date_lte,
        first_air_date_gte,
        first_air_date_lte,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    gcTime: 1000 * 60 * 60 * 65, // 65min
    retry: 2,
    maxPages: 10, //avoid bloating the cache
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

///////////////////////////// Trending movies and tv   ////////////////////////////////////////////////
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
    staleTime: 1000 * 60 * 60 * 6,
    gcTime: 1000 * 60 * 370,
    refetchOnWindowFocus: false,
    maxPages: 10, //avoid bloating the cache
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
