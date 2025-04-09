import { useEffect, useState, useRef } from 'react';

import { Link, useLocation } from 'react-router-dom';
import DraggableCarousel from '../containers/SimpleCarousel';
import ConfirmModal from '../modals/ConfirmModal';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../../state/store';
import { useShallow } from 'zustand/react/shallow';
import ContinueWatchingCard from '../cards/ContWatchCard';

interface WatchItem {
  title: string;
  poster_path: string;
  media_type: string;
  id: number;
  episode?: number;
  season?: number;
  release_date?: string;
  runtime?: string;
}

interface WatchItems {
  [key: string]: WatchItem;
}

const ContinueWatching = () => {
  const location = useLocation();
  const continueWatching = useStore(
    useShallow((state) => state.continueWatching)
  );

  const { clearContinueWatching } = useStore();
  const [items, setItems] = useState<WatchItems>({});
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (continueWatching) {
      if (location.pathname === '/account/history') {
        setItems(continueWatching);
      } else if (location.pathname === '/') {
        const slicedItems = Object.fromEntries(
          Object.entries(continueWatching).slice(0, 5)
        );
        setItems(slicedItems);
      }
    }
  }, [continueWatching, location.pathname]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClearAll = () => {
    clearContinueWatching();
    setItems({});
    setActiveItemId(null);

    closeModal();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    key: string
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveItemId(key);
    }
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;

    const items = carouselRef.current.querySelectorAll('[data-carousel-item]');
    const currentIndex = Array.from(items).findIndex(
      (item) =>
        item === document.activeElement || item.contains(document.activeElement)
    );

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          (items[currentIndex + 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (currentIndex > 0) {
          (items[currentIndex - 1] as HTMLElement).focus();
        }
        break;
    }
  };

  return (
    <div className='ml-6'>
      <ConfirmModal
        showModal={openModal}
        closeModal={closeModal}
        handleClick={handleClearAll}
        message={'Are you sure you want to clear everything?'}
      />

      {Object.keys(items).length !== 0 && (
        <>
          <div className='z-10 flex items-center'>
            {location.pathname === '/account/history' && (
              <div className='w-full flex justify-end items-center'>
                <button
                  onClick={() => setOpenModal(true)}
                  className='bg-gray-700 h-7 z-10  w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
                >
                  Clear All
                </button>
              </div>
            )}
            {location.pathname === '/' && (
              <>
                <Link
                  to='/account/history'
                  className='pointer-events-auto text-white flex items-center'
                >
                  <h1 className='z-10 text-2xl font-semibold pr-2 pb-1.5'>
                    Continue Watching
                  </h1>
                  <ChevronRight color='#ffffff' />
                </Link>
              </>
            )}
          </div>

          <div
            ref={carouselRef}
            className='flex'
            onKeyDown={handleCarouselKeyDown}
          >
            <DraggableCarousel>
              {Object.keys(items).map((key: string) => {
                const isActive = activeItemId === key;
                return (
                  <div
                    data-carousel-item
                    tabIndex={0}
                    className='text-white mr-3 mt-4 relative flex-shrink-0 focus:outline-2 focus:outline-white '
                    key={key}
                    onFocus={() => setActiveItemId(key)}
                    onBlur={() => setActiveItemId(null)}
                    onTouchStart={() => setActiveItemId(key)}
                    onMouseEnter={() => setActiveItemId(key)}
                    onMouseLeave={() => setActiveItemId(null)}
                    onKeyDown={(e) => handleKeyDown(e, key)}
                  >
                    <ContinueWatchingCard
                      item={items[key]}
                      isActive={isActive}
                      setActiveItemId={setActiveItemId}
                      activeItemId={activeItemId}
                    />
                  </div>
                );
              })}
            </DraggableCarousel>
          </div>
        </>
      )}
    </div>
  );
};

export default ContinueWatching;
