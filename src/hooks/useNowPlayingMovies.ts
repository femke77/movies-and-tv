import { TMDBClient } from '../utils/axiosConfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { IMovie } from '../interfaces/IMovie';

interface ILogo {
  iso_639_1: string;
  file_path: string;
}

/**
 * Fetches and attaches English logo paths for the first two movies in the provided array.
 * Makes parallel API requests to TMDB for movie images and extracts English logos.
 * 
 * @param movies - Array of movie objects to process
 * @returns Promise resolving to the same array of movies with attached logo paths
 *          in the 'title_logo' property. If no English logo is found, null is used.
 * 
 * @remarks
 * - Only processes the first two movies in the array for performance
 * - Specifically looks for English logos (iso_639_1 === 'en')
 * - Handles API errors gracefully by setting logo to null
 * - Preserves all original movie properties while adding the title_logo field
 */

const fetchFirstTwoLogos = async (movies: IMovie[]): Promise<IMovie[]> => {
  if (movies.length === 0) return [];
 
  const [firstMovie, secondMovie] = movies;

  const logoPromises = [firstMovie, secondMovie].map(async (movie) => {
    if (!movie) return null;
    try {
      const { data: images } = await TMDBClient.get(
        `/movies/${movie.id}/images`,
      );
      return {
        id: movie.id,
        logo:
          images?.logos?.find((logo: ILogo) => logo.iso_639_1 === 'en')
            ?.file_path || null,
      };
    } catch {
      return { id: movie.id, logo: null };
    }
  });

  const logos = await Promise.all(logoPromises);
  const logoMap = new Map(
    logos.filter(Boolean).map((item) => [item!.id, item!.logo]),
  );

  return movies.map((movie) => ({
    ...movie,
    title_logo: logoMap.get(movie.id) || null,
  }));
};

export const useNowPlayingMovies = () => {
  return useQuery<IMovie[], Error>({
    queryKey: ['now_playing_movies'],
    queryFn: async () => {
      const response = await TMDBClient.get('/movie/now_playing');
      const movies = response.data.results;
      return fetchFirstTwoLogos(movies);
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 70,
    refetchOnWindowFocus: false,
  });
};



/**
 * Custom hook to fetch and manage movie logo images with prefetching capabilities.
 * 
 * @param movieId - The ID of the movie to fetch the logo for
 * @param isVisible - Boolean flag indicating if the movie component is currently visible
 * @param currentIndex - Current index in the movie list
 * @param movieList - Array of movie objects
 * 
 * @returns The URL path of the English language logo for the specified movie, or null if not found
 * 
 * @remarks
 * This hook handles:
 * - Fetching movie logo images from TMDB API
 * - Caching logo data using React Query
 * - Prefetching the next movie's logo when current movie is visible
 * - Only English language logos are returned
 * - Implements stale time of 1 hour and garbage collection time of 70 minutes
 * 
 * @example
 * ```typescript
 * const logo = useMovieLogo(movieId, isVisible, currentIndex, movieList);
 * ```
 */

export const useMovieLogo = (
  movieId: number,
  isVisible: boolean,
  currentIndex: number,
  movieList: IMovie[],
) => {

  const queryClient = useQueryClient();

  const { data: logo } = useQuery({
    queryKey: ['movie-logo', movieId],
    queryFn: async () => {
      const { data: images } = await TMDBClient.get(`/movie/${movieId}/images`);
      return (
        images?.logos?.find((logo: ILogo) => logo.iso_639_1 === 'en')
          ?.file_path || null
      );
    },
    enabled: isVisible,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 70,
    refetchOnWindowFocus: false,
  });

  // prefetching for the next logo
  useEffect(() => {
    if (isVisible && movieList.length > 0) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < movieList.length) {
        const nextMovie = movieList[nextIndex];
 
        const cachedData = queryClient.getQueryData([
          'movie-logo',
          nextMovie.id,
        ]);
        if (!cachedData) {
          queryClient.prefetchQuery({
            queryKey: ['movie-logo', nextMovie.id],
            queryFn: async () => {
              const { data: images } = await TMDBClient.get(
                `/movie/${nextMovie.id}/images`,
              );
              return (
                images?.logos?.find((logo: ILogo) => logo.iso_639_1 === 'en')
                  ?.file_path || null
              );
            },
          });
        }
      }
    }
  }, [isVisible, currentIndex, movieList, queryClient]);

  return logo;
};
