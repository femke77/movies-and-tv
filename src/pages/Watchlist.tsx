import { useBookmarkStore } from '../state/store';
import { ItemCard } from '../components/ItemCard';
import {
  useQueries,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useCallback, useState } from 'react';
import { fetchItemDetail } from '../hooks/useItemOrWatchDetail';
import { IItem } from '../interfaces/IItem';

const Watchlist = () => {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [items, setItems] = useState<IItem[]>([]);
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

  useEffect(() => {
    setItems(itemDetails);
  }, [itemDetails]);

  useEffect(() => {
    // ensure removed bookmarks don't stay in cache
    queryClient.invalidateQueries({ queryKey: ['watchlist'] });
  }, [bookmarks, queryClient]);

  const filterItems = (media_type: string) => {
    if (media_type === 'all') {
      setItems(itemDetails);
      return;
    }
    const filtered = itemDetails.filter(
      (item) => item.media_type === media_type
    );
    setItems(filtered);
  };

  return (
    <div className="mt-24 text-white">
      <h1 className="text-4xl text-center mx-3 mb-6">Watchlist</h1>
      {/* <hr className="border-gray-800 border-1  mb-4 mx-30" /> */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className="bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6"
          onClick={() => filterItems('tv')}
        >
          TV Shows
        </button>
        <button
          className="bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6"
          onClick={() => filterItems('movie')}
        >
          Movies
        </button>

        <button
          className="bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6"
          onClick={() => filterItems('all')}
        >
          All
        </button>
      </div>
      {bookmarks.length === 0 && (
        <div className="text-center text-white text-2xl my-10">
          Nothing saved yet!
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
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
