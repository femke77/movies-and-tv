import { useBookmarkStore } from '../state/store';
import { ItemCard } from '../components/ItemCard';
import {
  useQueries,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useCallback, useState, useRef, useTransition } from 'react';
import { fetchItemDetail } from '../hooks/useItemOrWatchDetail';
import { IItem } from '../interfaces/IItem';
import useDocumentTitle from '../hooks/usePageTitles';

const Watchlist = () => {
  useDocumentTitle('Your Watchlist | BingeBox');
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [items, setItems] = useState<IItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>('');
  const filterRef = useRef('all');
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
              media_type: result.data.name ? 'tv' : 'movie',
            };

            return item;
          })
          .filter((item): item is IItem => item !== null),
        pending: results.some((result) => result.isPending),
      };
    }, []),
  });

  const itemDetails = itemQueries.data || [];

  useEffect(() => {
    startTransition(() => {
      filterItems(filterRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemDetails]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['watchlist'] });
  }, [bookmarks, queryClient]);

  const filterItems = (media_type: string): void => {
    if (!itemDetails) return;

    if (media_type === 'all') {
      setItems(itemDetails);
      filterRef.current = 'all';
      setMessage(bookmarks.length === 0 ? 'Nothing Saved Yet!' : ''); // use bookmarks here to stop flash of message during loading
    } else {
      const filtered = itemDetails.filter(
        (item) => item.media_type === media_type,
      );
      setItems(filtered);
      filterRef.current = media_type;

      if (filtered.length === 0) {
        setMessage(
          media_type === 'tv'
            ? 'No TV Shows saved yet!'
            : 'No Movies saved yet!',
        );
      } else {
        setMessage('');
      }
    }
  };

  return (
    <div className='mt-24 mx-3  text-white min-h-screen'>
      <h1 className='relative z-1 text-4xl text-center mx-3 mb-9'>Watchlist</h1>
      <div className='fixed inset-0 z-0 bg-gradient-to-r from-black to-neutral-800'></div>
      <div className='relative flex justify-center space-x-4 mb-8 z-1'>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => startTransition(() => filterItems('tv'))}
        >
          TV Shows
        </button>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => startTransition(() => filterItems('movie'))}
        >
          Movies
        </button>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => startTransition(() => filterItems('all'))}
        >
          All
        </button>
      </div>

      {isPending ? (
        <div className='flex justify-center items-center text-white text-2xl my-10 w-full'>
          {/* <p>Loading...</p> */}
        </div>
      ) : (
        <>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                itemType={item.media_type || ''}
                isBookmarked={true}
              />
            ))}
          </div>

          <div className='relative z-1 flex justify-center items-center text-white text-2xl my-10 w-full'>
            <h2>{message}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Watchlist;
