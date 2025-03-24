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

const Watchlist = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const queryClient = useQueryClient();

  const itemQueries = useQueries({
    queries: bookmarks.map((item) => ({
      queryKey: ['watchlist', item.id, item.type],
      queryFn: () => fetchItemDetail(item.type, item.id),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    })),
    combine: useCallback((results: QueryObserverResult<IItem, Error>[]) => {
      return {
        data: results
          .map((result) => {
            if (!result.data) return null;
            const item: IItem = {
              ...result.data,
              media_type: result.data.name ? 'tv' : 'movie', //items with name defined are tv, items with title defined are movies
            };

            return item;
          })
          .filter((item): item is IItem => item !== null),
        pending: results.some((result) => result.isPending),
      };
    }, []),
  });

  const itemDetails = itemQueries.data;
  const isLoading = itemQueries.pending;

  const itemSkeletons = Array(bookmarks.length || 5).fill(null);

  useEffect(() => {
    // ensure removed bookmarks don't stay in cache
    queryClient.invalidateQueries({ queryKey: ['watchlist'] });
  }, [bookmarks, queryClient]);

  return (
    <div className='mt-24 text-white'>
      <h1 className='text-3xl text-center mx-3 mb-4'>Watchlist</h1>
      <hr className='border-gray-800 border-1  mb-4 mx-30' />

      {bookmarks.length === 0 && (
        <div className='text-center text-white text-2xl my-10'>
          Nothing saved yet!
        </div>
      )}
      {isLoading && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {itemSkeletons.map((_, index) => (
            <ItemCardSkeleton key={`item-skeleton-${index}`} />
          ))}
        </div>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {itemDetails.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            itemType={item.media_type || ''}
            isBookmarked={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;

/* check if it's a tv show by looking for name. check if it's a movei by looking for title.  A filter further up the chain already ensures that title or name is not null or it would never have been shown to the user in the first place. */
