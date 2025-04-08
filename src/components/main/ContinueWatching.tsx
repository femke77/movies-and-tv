import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { Link, useLocation } from 'react-router-dom';
import DraggableCarousel from '../containers/SimpleCarousel';
import ConfirmModal from '../modals/ConfirmModal';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../../state/store';

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
  const continueWatching = useStore((state) => state.continueWatching);

  const { removeFromContinueWatching, clearContinueWatching } = useStore();
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
          Object.entries(continueWatching).slice(0, 5),
        );
        setItems(slicedItems);
      }
    }
  }, [continueWatching, location.pathname]);

  const handleDelete = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
    key: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      removeFromContinueWatching(Number(key.split('-')[0]), key.split('-')[1]);
      setActiveItemId(null);
    }, 50);
  };

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
    key: string,
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
                    className='text-white relative flex-shrink-0 focus:outline-2 focus:outline-white '
                    key={key}
                    onFocus={() => setActiveItemId(key)}
                    onBlur={() => setActiveItemId(null)}
                    onTouchStart={() => setActiveItemId(key)}
                    onMouseEnter={() => setActiveItemId(key)}
                    onMouseLeave={() => setActiveItemId(null)}
                    onKeyDown={(e) => handleKeyDown(e, key)}
                  >
                    <div className={`relative ${isActive ? 'active' : ''}`}>
                      {/* Image and gradient overlay */}
                      {items[key].poster_path ? (
                        <img
                          className='rounded-xl mr-2 w-86 h-50'
                          src={`https://image.tmdb.org/t/p/w300${items[key].poster_path}`}
                          alt={`${items[key].title}'s backdrop`}
                          loading='lazy'
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/noimage2.webp';
                          }}
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
                                handleDelete(e, key);
                              }
                            }}
                            onTouchStart={(e) => handleDelete(e, key)}
                            onClick={(e) => handleDelete(e, key)}
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
                        <h2 className='text-xl font-bold'>
                          {items[key].title}
                        </h2>
                        <h3 className='text-lg'>
                          {items[key].media_type === 'tv' ? (
                            <p>
                              S{items[key].season}:E{items[key].episode}
                            </p>
                          ) : (
                            <p>
                              {dayjs(items[key].release_date).format('YYYY') ===
                              'Invalid Date'
                                ? 'Unknown Date '
                                : dayjs(items[key].release_date).format(
                                    'YYYY',
                                  )}{' '}
                              &#x2022; {Number(items[key].runtime) || '0'} min
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
                          to={`/watch/${items[key].media_type}/${items[key].id}`}
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
