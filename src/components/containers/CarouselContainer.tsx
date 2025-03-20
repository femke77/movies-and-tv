import { useRef } from 'react';
import { ItemCard } from '../ItemCard';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { IItem } from '../../interfaces/IItem';
import { useBookmarkStore } from '../../state/store';
const SlideContainer = ({
  items,
  itemType,
}: {
  items: IItem[];
  itemType: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className='pl-6 relative w-full'>
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className='absolute left-0 top-37 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black transition'
      >
        <ChevronLeftIcon className='w-8 h-8 pr-[4px]' />
      </button>

      {/* Scrollable Container renders ItemCard */}
      <div
        ref={scrollRef}
        className='flex gap-3 px-4 py-2 w-full overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div key={`item-${item.id}`} className='w-[180px] flex-shrink-0'>
            <ItemCard
              textSize={'md'}
              item={item}
              itemType={itemType}
              showRating={true}
              showGenres={false}
              isBookmarked={bookmarks.some(bookmarks => bookmarks.id === item.id && bookmarks.type === itemType)} 
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className='absolute right-0 top-37 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black transition'
      >
        <ChevronRightIcon className='w-8 h-8 pl-[3px]' />
      </button>
    </div>
  );
};

export default SlideContainer;
