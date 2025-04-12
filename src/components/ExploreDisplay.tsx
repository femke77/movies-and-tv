import { useEffect, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { IItem } from '../interfaces/IItem';
import { MemoizedItemCard } from './cards/ItemCard';
import { useSuspenseStore } from '../state/store';
import { useShallow } from 'zustand/react/shallow';
interface IExploreProps {
  data: {
    pages: { results: IItem[] }[];
  };
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  itemType?: string;
}

const Explore = memo(
  ({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    itemType = 'movie',
  }: IExploreProps) => {
    const { ref, inView } = useInView();
    const bookmarks = useSuspenseStore(useShallow((state) => state.bookmarks));

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return null; //suspense will take care of this
    const allItems = data?.pages?.flatMap((page) => page.results) ?? [];
    return (
      <div className='mt-8 mx-3'>
        <div className='max-w-[1800px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {allItems?.length > 0 ? (
            allItems.map((item: IItem) => (
              <MemoizedItemCard
                itemType={itemType}
                key={`${itemType}-${item.id}`}
                item={item}
                showGenres={true}
                showRating={true}
                isBookmarked={
                  !!bookmarks[
                    `${item.id}-${item.media_type || itemType || 'Unknown'}`
                  ]
                }
              />
            ))
          ) : (
            <p className='text-lg text-gray-400'>No results found.</p>
          )}
        </div>
        <div ref={ref} className='h-10 mt-4 mb-20'>
          {isFetchingNextPage && (
            <div className='flex justify-center my-10'>
              <div className='loader'></div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

Explore.displayName = 'Explore';
export default Explore;
