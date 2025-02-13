import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

// Search movie by title

const searchTitleResults = async (
  query: string = '',
  page: string = '1',
  language: string = 'en-US',
) => {
  const { data } = await TMDBClient.get(
    `/search/movie?include_adult=false&language=${language}&query=${query}&page=${page}`,
  );
  return data.results;
};

export const useSearchTitleQuery = (query: string, page: string) => {
  return useQuery({
    queryKey: ['search', query, page],
    queryFn: async () => {
      if (!query) {
        throw new Error('Search query is required');
      }
      return searchTitleResults(query, page);
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    retry: 2,

    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
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
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: true,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  });
};
