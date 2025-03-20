import { useBookmarkStore } from '../state/store';
import { ItemCard } from '../components/ItemCard';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchItemDetail } from '../hooks/useItemOrWatchDetail';
import ItemCardSkeleton from '../components/loadingSkeletons/ItemCardSkeleton';

const SavedItems = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const queryClient = useQueryClient();

  // TODO separate into two storage components to avoid this.
  const movieBookmarks = bookmarks.filter((b) => b.type === 'movie');
  const tvBookmarks = bookmarks.filter((b) => b.type === 'tv');

  const movieQueries = useQueries({
    queries: movieBookmarks.map((movie) => ({
      queryKey: ['movie', movie.id],
      queryFn: () => fetchItemDetail('movie', movie.id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })),
  });

  const tvQueries = useQueries({
    queries: tvBookmarks.map((tv) => ({
      queryKey: ['tv', tv.id],
      queryFn: () => fetchItemDetail('tv', tv.id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })),
  });

  const movieDetails = movieQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data);

  const isLoadingMovies = movieQueries.some((query) => query.isLoading);

  const tvDetails = tvQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data);

  const isLoadingTv = tvQueries.some((query) => query.isLoading);

  const movieSkeletons = Array(movieBookmarks.length || 5).fill(null);
  const tvSkeletons = Array(movieBookmarks.length || 5).fill(null);

  // invalidate queries when bookmarks change
  useEffect(() => {
    // To ensure removed bookmarks don't stay in cache
    queryClient.invalidateQueries({ queryKey: ['movie'] });
    queryClient.invalidateQueries({ queryKey: ['tv'] });
  }, [bookmarks, queryClient]);

  return (
    <div className='mt-24 text-white'>
      <h1 className='text-4xl text-center mx-3 mb-6'>
        Your Bookmarked Movies & Shows
      </h1>

      <h2 className='text-2xl mr-3 mb-3'>Saved Movies</h2>
      {isLoadingMovies && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {movieSkeletons.map((_, index) => (
            <ItemCardSkeleton key={`movie-skeleton-${index}`} />
          ))}
        </div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {movieDetails.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            itemType='movie'
            isBookmarked={true}
          />
        ))}
      </div>

      <h2 className='text-2xl mr-3 mb-3'>Saved TV Shows</h2>
      {isLoadingTv && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {tvSkeletons.map((_, index) => (
            <ItemCardSkeleton key={`movie-skeleton-${index}`} />
          ))}
        </div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {tvDetails.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            itemType='tv'
            isBookmarked={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedItems;
