import { IItem } from "../interfaces/IItem";
import { TMDBClient } from "../utils/axiosConfig";
import { useInfiniteQuery } from "@tanstack/react-query";

// Search movie by title

const searchResults = async ({ query = "", pageParam = 1 }) => {
  const { data } = await TMDBClient.get(
    `/search/multi?query=${query}&include_adult=false&language=en&page=${pageParam}`
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteSearchQuery = (query: string) => {
  return useInfiniteQuery({
    queryKey: ["infinite-search", query],
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
          (item: IItem) => item.title || item.name || item.poster_path
        ),
      })),
      pageParams: data.pageParams,
    }),
  });
};

// Discover movies

const discoverMovieResults = async (
  sort: string = "popularity.desc",
  lang: string = "en",
  pageParam: number = 1,
  genre: string = ""
) => {
  const { data } = await TMDBClient.get(
    `/discover/movie?include_adult=false&language=${lang}&sort_by=${sort}&page=${pageParam}&genre=${genre}`
  );
  return {
    results: data.results,
    nextPage: pageParam < data.total_pages ? pageParam + 1 : undefined,
    totalPages: data.total_pages,
  };
};

export const useInfiniteDiscoverMovieQuery = ( sort: string, lang: string, genre: string) => {
  return useInfiniteQuery({
    queryKey: ["movie-discover", sort, genre],
    queryFn: ({ pageParam }) =>
      discoverMovieResults(sort, lang, pageParam, genre),
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
          (item: IItem) => (item.title || item.name) || item.poster_path
        ),
      })),
      pageParams: data.pageParams,
    }),
  });
};


