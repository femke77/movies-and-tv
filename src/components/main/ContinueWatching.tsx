import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { Link, useLocation } from 'react-router-dom';
import DraggableCarousel from '../containers/SimpleCarousel';
import ConfirmModal from '../modals/ConfirmModal';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../../state/store';
import { useShallow } from 'zustand/react/shallow';
import LazyImage from '../helpers/LazyImage';

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

const ContinueWatching = () => {
  const location = useLocation();
  const continueWatching = useStore(
    useShallow((state) => state.continueWatching),
  );

  const { removeFromContinueWatching, clearContinueWatching } = useStore();
  const [items, setItems] = useState<WatchItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (continueWatching) {
      if (location.pathname === '/account/history') {
        setItems(continueWatching);
      } else if (location.pathname === '/') {
        const slicedItems = continueWatching.slice(0, 5);

        setItems(slicedItems);
      }
    }
  }, [continueWatching, location.pathname]);

  const handleDelete = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    id: number,
    media_type: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // debounce the last item to avoid clicking the item card.
    // eventually make all deleting a modal interaction
    if (items.length === 1) {
      setTimeout(() => {
        removeFromContinueWatching(id, media_type);
        setActiveItemId(null);
      }, 300);
    } else {
      removeFromContinueWatching(id, media_type);
      setActiveItemId(null);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClearAll = () => {
    clearContinueWatching();
    setItems([]);
    setActiveItemId(null);

    closeModal();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveItemId(id);
    }
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;

    const items = carouselRef.current.querySelectorAll('[data-carousel-item]');
    const currentIndex = Array.from(items).findIndex(
      (item) =>
        item === document.activeElement ||
        item.contains(document.activeElement),
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

      {items?.length !== 0 && (
        <>
          <div className='z-10 2-full flex justify-between items-center flex-wrap'>
            <Link
              to='/account/history'
              className='pointer-events-auto text-white flex items-center'
            >
              <h1 className='z-10 text-2xl font-bold pr-2 pb-1.5'>
                Continue Watching
              </h1>
              <ChevronRight color='#ffffff' />
            </Link>

            <button
              onClick={() => setOpenModal(true)}
              className='bg-gray-700 h-7 z-10  w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
            >
              Clear All
            </button>
          </div>

          <div
            ref={carouselRef}
            className='flex'
            onKeyDown={handleCarouselKeyDown}
          >
            <DraggableCarousel>
              {items?.map((item) => {
                const isActive = activeItemId === item.id;
                return (
                  <div
                    data-carousel-item
                    tabIndex={0}
                    className='text-white relative flex-shrink-0 focus:outline-2 focus:rounded-lg focus:outline-white '
                    key={item.id}
                    onFocus={() => setActiveItemId(item.id)}
                    onBlur={() => setActiveItemId(null)}
                    onTouchStart={() => setActiveItemId(item.id)}
                    onMouseEnter={() => setActiveItemId(item.id)}
                    onMouseLeave={() => setActiveItemId(null)}
                    onKeyDown={(e) => handleKeyDown(e, item.id)}
                  >
                    <div className={`relative ${isActive ? 'active' : ''}`}>
                      {/* Image and gradient overlay */}
                      {item.poster_path ? (
                        <LazyImage
                          className='rounded-xl  w-86 h-50'
                          src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                          alt={`${item.title}'s backdrop`}
                        />
                      ) : (
                        <img
                          className='rounded-xl mr-2  object-cover w-86 h-50'
                          src='/noimage2.webp'
                          loading='lazy'
                          alt='no backdrop available'
                        />
                      )}
                      {/* <div className ={`bg-white absolute bottom-0 left-0 w-20 h-[4px] rounded-xl z-5`}></div> */}

                      <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent' />
                      <div
                        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 rounded-xl ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      ></div>

                      <div
                        className={`absolute top-0 right-2 transition-opacity duration-200 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <div className='absolute right-2 z-50 p-2 pointer-events-auto'>
                          <button
                            tabIndex={isActive ? 0 : -1}
                            aria-label='Remove item'
                            className='text-white font-bold rounded-full z-50 cursor-pointer bg-black/60 p-2 hover:bg-black/80 focus:outline-2 focus:outline-white '
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                handleDelete(e, item.id, item.media_type);
                              }
                            }}
                            onTouchStart={(e) =>
                              handleDelete(e, item.id, item.media_type)
                            }
                            onClick={(e) =>
                              handleDelete(e, item.id, item.media_type)
                            }
                          >
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='white'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <line x1='18' y1='6' x2='6' y2='18'></line>
                              <line x1='6' y1='6' x2='18' y2='18'></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Title and info */}
                      <div className='absolute bottom-0 left-0 w-full px-5 pb-4'>
                        <h2 className='text-xl font-bold'>{item.title}</h2>
                        <h3 className='text-lg'>
                          {item.media_type === 'tv' ? (
                            <p>
                              S{item.season}:E{item.episode}
                            </p>
                          ) : (
                            <p>
                              {dayjs(item.release_date).format('YYYY') ===
                              'Invalid Date'
                                ? 'Unknown Date '
                                : dayjs(item.release_date).format('YYYY')}{' '}
                              &#x2022; {Number(item.runtime) || '0'} min
                            </p>
                          )}
                        </h3>
                      </div>

                      {/* Play button overlay - only appears on hover/touch */}
                      <div
                        className={`absolute inset-0 flex items-center justify-center  ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Link
                          to={`/watch/${item.media_type}/${item.id}`}
                          tabIndex={isActive ? 0 : -1}
                          className='rounded-full bg-white/20 p-4 backdrop-blur-sm focus:outline-2 focus:outline-white '
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='32'
                            height='32'
                            viewBox='0 0 24 24'
                            fill='white'
                            stroke='white'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <polygon points='5 3 19 12 5 21 5 3' />
                          </svg>
                        </Link>
                      </div>
                    </div>
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
