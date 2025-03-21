import { useBookmarkStore } from '../state/store';
import { ItemCard } from '../components/ItemCard';
import {
  useQueries,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { fetchItemDetail } from '../hooks/useItemOrWatchDetail';
import ItemCardSkeleton from '../components/loadingSkeletons/ItemCardSkeleton';
import { IItem } from '../interfaces/IItem';

const SavedItems = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const queryClient = useQueryClient();

  // TODO separate into two storage components to avoid this - do during array to object refactor.
  const movieBookmarks = bookmarks.filter((b) => b.type === 'movie');
  const tvBookmarks = bookmarks.filter((b) => b.type === 'tv');

  const movieQueries = useQueries({
    queries: movieBookmarks.map((movie) => ({
      queryKey: ['movie', movie.id],
      queryFn: () => fetchItemDetail('movie', movie.id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })),
    combine: useCallback((results: QueryObserverResult<IItem, Error>[]) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    }, []),
  });

  const tvQueries = useQueries({
    queries: tvBookmarks.map((tv) => ({
      queryKey: ['tv', tv.id],
      queryFn: () => fetchItemDetail('tv', tv.id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })),
    combine: useCallback((results: QueryObserverResult<IItem, Error>[]) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    }, []),
  });

  // Combine movie and TV query data
  const movieDetails = movieQueries.data;
  const isLoadingMovies = movieQueries.pending;

  const tvDetails = tvQueries.data;
  const isLoadingTv = tvQueries.pending;

  // prep loading skeletons
  const movieSkeletons = Array(movieBookmarks.length || 5).fill(null);
  const tvSkeletons = Array(movieBookmarks.length || 5).fill(null);

  // invalidate queries when bookmarks change
  useEffect(() => {
    // ensure removed bookmarks don't stay in cache
    queryClient.invalidateQueries({ queryKey: ['movie'] });
    queryClient.invalidateQueries({ queryKey: ['tv'] });
  }, [bookmarks, queryClient]);

  return (
    <div className="mt-24 text-white">
      <h1 className="text-3xl text-center mx-3 mb-6">Your Saved Movies & TV</h1>

      <h2 className="text-2xl mx-3 mb-3">Movies</h2>
      {movieBookmarks.length === 0 && (
        <div className="text-center text-white text-2xl my-10">
          No saved movies yet!
        </div>
      )}
      {isLoadingMovies && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {movieSkeletons.map((_, index) => (
            <ItemCardSkeleton key={`movie-skeleton-${index}`} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movieDetails
          .filter((item): item is IItem => item !== undefined)
          .map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              itemType="movie"
              isBookmarked={true}
            />
          ))}
      </div>
 <hr className="border-white/70 my-6 mx-9" />
      <h2 className="text-2xl mx-3 mb-3">TV</h2>
      {tvBookmarks.length === 0 && (
        <div className="text-center text-white text-2xl my-10">
          No saved TV Shows yet!
        </div>
      )}
      {isLoadingTv && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {tvSkeletons.map((_, index) => (
            <ItemCardSkeleton key={`movie-skeleton-${index}`} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {tvDetails
          .filter((item): item is IItem => item !== undefined)
          .map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              itemType="tv"
              isBookmarked={true}
            />
          ))}
      </div>
    </div>
  );
};

export default SavedItems;
