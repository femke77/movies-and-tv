import { TMDBClient } from '../utils/axiosConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { IItem } from '../interfaces/IItem';


/**
 * Fetches and attaches English logo paths for the first two movies in the provided array.
 * Makes parallel API requests to TMDB for movie images and extracts English logos.
 *
 * @param items - Array of movie objects to process
 * @returns Promise resolving to the same array of movies with attached logo paths
 *          in the 'title_logo' property. If no English logo is found, null is used.
 *
 * @remarks
 * - Only processes the first two movies in the array for performance
 * - Specifically looks for English logos (iso_639_1 === 'en')
 * - Handles API errors gracefully by setting logo to null
 * - Preserves all original movie properties while adding the title_logo field
 */

const fetchFirstTwoLogos = async (items: IItem[]): Promise<IItem[]> => {
  if (items.length === 0) return [];

  const [firstItem, secondItem] = items;

  const logoPromises = [firstItem, secondItem].map(async (item) => {
    if (!item) return null;
    try {
      const { data: images } = await TMDBClient.get(
        `/${item.media_type}/${item.id}/images`,
      );
      return {
        id: item.id,
        type: item.media_type,
        logo: images?.logos?.[0].file_path || null,
      };
    } catch {
      return { id: item.id, logo: null };
    }
  });

  const logos = await Promise.all(logoPromises);
  const logoMap = new Map(
    logos.filter(Boolean).map((item) => [item!.id, item!.logo]),
  );

  return items.map((item) => ({
    ...item,
    title_logo: logoMap.get(item.id) || null,
  }));
};

export const useTrendingAll = () => {
  return useQuery<IItem[], Error>({
    queryKey: ['all_trending_items'],
    queryFn: async () => {
      const response = await TMDBClient.get(
        '/trending/all/week?language=en-US',
      );
      // TODO put a max on the number of items from api JIC
      const items = response.data.results;
      const filteredItems = items.filter((item: IItem) => {
        return (
          item.poster_path &&
          item.backdrop_path &&
          item.overview &&
          item.media_type
        );
      });
      return fetchFirstTwoLogos(filteredItems);
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    refetchInterval: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch and manage movie logo images with prefetching capabilities.
 *
 * @param itemId - The ID of the movie to fetch the logo for
 * @param isVisible - Boolean flag indicating if the movie component is currently visible
 * @param currentIndex - Current index in the movie list
 * @param itemList - Array of movie objects
 *
 * @returns The URL path of the English language logo for the specified movie, or null if not found
 *
 * @remarks
 * This hook handles:
 * - Fetching movie logo images from TMDB API
 * - Caching logo data using React Query
 * - Prefetching the next movie's logo when current movie is visible
 * - Only English language logos are returned
 * - Implements stale time of 6 hour and garbage collection time of 370 minutes
 *
 * @example
 * ```typescript
 * const logo = useMovieLogo(movieId, isVisible, currentIndex, movieList);
 * ```
 */

export const useItemLogos = (
  itemId: number,
  type: string,
  isVisible: boolean,
  currentIndex: number,
  itemList: IItem[],
) => {
  const queryClient = useQueryClient();

  const { data: logo } = useQuery({
    queryKey: ['logo', itemId],
    queryFn: async () => {
      const { data: images } = await TMDBClient.get(
        `/${type}/${itemId}/images?language=en`,
      );
      return images?.logos?.[0]?.file_path || null;
    },
    enabled: isVisible,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 25,
    refetchInterval: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  // prefetching for the next slide's logo while the current one is visible
  useEffect(() => {
    if (isVisible && itemList.length > 0) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < itemList.length) {
        const nextMovie = itemList[nextIndex];

        const cachedData = queryClient.getQueryData(['logo', nextMovie.id]);

        if (!cachedData) {
          queryClient.prefetchQuery({
            queryKey: ['logo', nextMovie.id],
            queryFn: async () => {
              const { data: images } = await TMDBClient.get(
                `/${nextMovie.media_type}/${nextMovie.id}/images?language=en`,
              );
              return images?.logos?.[0].file_path || null;
            },
          });
        }
      }
    }
  }, [isVisible, currentIndex, itemList, queryClient]);

  return logo;
};
