import { IItem } from '../interfaces/IItem';
import { TMDBClient } from '../utils/axiosConfig';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

// Search movie by title

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
    queryKey: ['infiniteSearch', query],
    queryFn: ({ pageParam }) => searchResults({ query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!query,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    select: (data) => ({
      pages: data.pages.map(page => ({
        ...page,
        results: page.results.filter((item: IItem) => 
         ( item.title || item.name) || item.poster_path
        )
      })),
      pageParams: data.pageParams,
    })
  });
};
// Discover movies

const discoverResults = async (
  sort: string = 'popularity.desc',
  page: string = '1',
  language: string = 'en-US',
  genre: string = '',
) => {
  const { data } = await TMDBClient.get(
    `/movie/discover?include_adult=false&language=${language}&sort_by=${sort}&page=${page}&genre=${genre}`,
  );
  return data.results;
};

export const useDiscoverQuery = (sort: string, page: string, genre: string) => {
  return useQuery({
    queryKey: ['discover', sort, page, genre],
    queryFn: async () => {
      return discoverResults(sort, page, genre);
    },
    enabled: true,
    staleTime: 0,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  });
};

//     `/search/movie?include_adult=false&language=${language}&query=${query}&page=${page}`,
