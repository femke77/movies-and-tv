import { TMDBClient } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const fetchItemDetail = async (type: string, id: string) => {
  const { data } = await TMDBClient.get(`/${type}/${id}`);
  return data;
};

const fetchTVContentRating = async (tv_id: string) => {
  const { data } = await TMDBClient.get(
    `/tv/${tv_id}/content_ratings?language=en`,
  );
  const usRegion = data.results.find(
    (region: { iso_3166_1: string }) => region.iso_3166_1 === 'US',
  );
  const certification = usRegion?.rating || 'N/A';
  return certification;
};

const fetchMovieRating = async (movie_id: string) => {
  const { data } = await TMDBClient.get(
    `/movie/${movie_id}/release_dates?language=en`,
  );
  const usRegion = data.results.find(
    (region: { iso_3166_1: string }) => region.iso_3166_1 === 'US',
  );
  const certification = usRegion?.release_dates?.[0].certification || 'N/A';
  return certification;
};

const fetchItemCredits = async (type: string, id: string) => {
  const { data } = await TMDBClient.get(`/${type}/${id}/credits`);
  return data;
};

export const useItemDetail = (type: string, id: string) => {
  return useQuery({
    queryKey: ['item-detail', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('ID is required');
      }

      if (type === 'movie') {
        const [movie, rating, credits] = await Promise.all([
          fetchItemDetail(type, id),
          fetchMovieRating(id),
          fetchItemCredits(type, id),
        ]);

        return {
          ...movie,
          rating,
          ...credits,
        };
      } else if (type === 'tv') {
        const [tv, rating, credits] = await Promise.all([
          fetchItemDetail(type, id),
          fetchTVContentRating(id),
          fetchItemCredits(type, id),
        ]);

        return {
          ...tv,
          rating,
          ...credits,
        };
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
  });
};
