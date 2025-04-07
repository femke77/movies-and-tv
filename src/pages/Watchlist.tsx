import { useStore } from '../state/store';
import { ItemCard } from '../components/cards/ItemCard';
import {
  useQueries,
  useQueryClient,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { fetchItemDetail } from '../hooks/useItemOrWatchDetail';
import { IItem } from '../interfaces/IItem';
import useDocumentTitle from '../hooks/usePageTitles';
import BackButton from '../components/buttons/BackBtn';

const Watchlist = () => {
  useDocumentTitle('Your Watchlist | BingeBox');
  const bookmarks = useStore((state) => state.bookmarks);
  

  const [filterType, setFilterType] = useState<string>('all');
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

  // Memoized filtered items to prevent unnecessary re-renders
  const filteredItems = useMemo(() => {
    const itemDetails = itemQueries.data || [];

    if (filterType === 'all') return itemDetails;

    return itemDetails.filter((item) => item.media_type === filterType);
  }, [filterType, itemQueries.data]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['watchlist'] });
  }, [bookmarks, queryClient]);

  // message:
  const message = useMemo(() => {
    if (filteredItems.length === 0) {
      if (filterType === 'tv') return 'No TV Shows saved yet!';
      if (filterType === 'movie') return 'No Movies saved yet!';
      return 'Nothing Saved Yet!';
    }
    return '';
  }, [filteredItems, filterType]);

  return (
    <div className='mt-24 mx-3 text-white min-h-screen'>
      <div className='absolute top-20 left-3 z-1'>
        <BackButton />
      </div>
      <h1 className='relative z-1 text-4xl text-center mx-3 mb-9'>Watchlist</h1>
      <div className='fixed inset-0 z-0 bg-gradient-to-r from-black to-neutral-800' />

      <div className='relative flex justify-center space-x-4 mb-8 z-1'>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => setFilterType('tv')}
        >
          TV Shows
        </button>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => setFilterType('movie')}
        >
          Movies
        </button>
        <button
          className='bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
          onClick={() => setFilterType('all')}
        >
          All
        </button>
      </div>

      {itemQueries.pending ? (
        <div className='flex justify-center items-center text-white text-2xl my-10 w-full'>
          Loading...
        </div>
      ) : (
        <>
          <div className='max-w-[1800px] mx-auto  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {filteredItems.map((item) => (
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
