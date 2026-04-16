import { IGenre } from '../../interfaces/IGenre';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { isSmartTvBrowser } from '../../utils/helpers';

const GenreSelector = ({
  genres,
  selectedGenres,
  onGenreToggle,
  deselectedGenres,
  onUnwantedGenreToggle,
}: {
  genres: IGenre[];
  selectedGenres: string[];
  onGenreToggle: (_genre: string) => void;
  deselectedGenres: string[];
  onUnwantedGenreToggle: (_genre: string) => void;
}) => {
  const { width } = useWindowSize();
  const isTvBrowser = isSmartTvBrowser();

  const [open, setOpen] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const touchDurationThreshold = 500; // Time in ms to consider a touch as a long press
  const isTouchDeviceRef = useRef<boolean>(false);
  const longPressTriggeredRef = useRef(false);

  const clearLongPressTimer = () => {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleTouchStart = (genreId: string) => {
    isTouchDeviceRef.current = true;
    touchStartTimeRef.current = Date.now();
    longPressTriggeredRef.current = false;
    // long press timer
    const timer = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      onUnwantedGenreToggle(genreId);
    }, touchDurationThreshold);

    setLongPressTimer(timer);
  };

  const handleTouchEnd = (genreId: string, e: React.TouchEvent) => {
    e.preventDefault();

    // Clear long press timer
    clearLongPressTimer();

    // If the touch was shorter than the threshold, treat it as a regular click
    const touchDuration = Date.now() - touchStartTimeRef.current;
    if (touchDuration < touchDurationThreshold && !longPressTriggeredRef.current) {
      onGenreToggle(genreId);
    }
  };

  const handleTouchMove = () => {
    // Cancel long press if user moves finger
    clearLongPressTimer();
  };

  const handleClick = (genreId: string) => {
    // Only process click events on non-touch devices
    if (!isTouchDeviceRef.current) {
      onGenreToggle(genreId);
    }
    // Reset touch device flag after a short delay
    setTimeout(() => {
      isTouchDeviceRef.current = false;
    }, 100);
  };

  const handleMouseDown = (genreId: string) => {
    if (!isTvBrowser) return;
    longPressTriggeredRef.current = false;
    const timer = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      onUnwantedGenreToggle(genreId);
    }, touchDurationThreshold);
    setLongPressTimer(timer);
  };

  const handleMouseUp = (genreId: string) => {
    if (!isTvBrowser) return;
    const wasLongPress = longPressTriggeredRef.current;
    clearLongPressTimer();

    if (!wasLongPress) {
      onGenreToggle(genreId);
    }

    longPressTriggeredRef.current = false;
  };

  const getTvGenreButtonStyle = (genreId: string) => {
    if (!isTvBrowser) return undefined;

    if (selectedGenres.includes(genreId)) {
      return {
        backgroundColor: '#1d4ed8',
        borderColor: '#2563eb',
        color: '#ffffff',
      };
    }

    if (deselectedGenres.includes(genreId)) {
      return {
        backgroundColor: 'rgba(153, 27, 27, 0.85)',
        borderColor: '#b91c1c',
        color: '#ffffff',
      };
    }

    return {
      backgroundColor: 'rgba(31, 41, 55, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.12)',
      color: '#ffffff',
    };
  };

  return (
    <>
      {width < 768 && !isTvBrowser ? (
        <div className='flex justify-start lg:justify-end mr-6 '>
          <button
            onClick={() => setOpen(!open)}
            className='mb-2 mx-3 text-center text-white text-md  h-[35px] w-[150px] rounded-lg
            bg-gradient-to-r from-[#292e30] to-[#3d3737] cursor-pointer hover:outline-blue-700 hover:outline-1 hover:translate-[1px] active:translate-[1px]'
          >
            {!open ? 'Select by Genre' : 'Close Genres'}
          </button>
        </div>
      ) : null}

      {(open || isTvBrowser || (width >= 768 && !open)) && (
        <>
          <p className='mx-4 text-white/65 text-md lg:-mt-3'>
            Genres{' '}
            <span className='text-sm italic'>
              (click or press to include, right click or long press to exclude)
            </span>
          </p>
          <div
            className={clsx(
              `grid gap-1 mt-4 ${
                width < 400 && !isTvBrowser
                  ? `grid-cols-1`
                  : `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1`
              }`,
            )}
            style={
              isTvBrowser
                ? {
                    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                  }
                : undefined
            }
          >
            {genres.map((genre) => (
              <button
                type='button'
                onClick={() => {
                  if (!isTvBrowser) {
                    handleClick(String(genre.id));
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onUnwantedGenreToggle(String(genre.id));
                }}
                onTouchStart={() => {
                  if (!isTvBrowser) {
                    handleTouchStart(String(genre.id));
                  }
                }}
                onTouchEnd={(e) => {
                  if (!isTvBrowser) {
                    handleTouchEnd(String(genre.id), e);
                  }
                }}
                onTouchMove={() => {
                  if (!isTvBrowser) {
                    handleTouchMove();
                  }
                }}
                onMouseDown={() => handleMouseDown(String(genre.id))}
                onMouseUp={() => handleMouseUp(String(genre.id))}
                onMouseLeave={() => {
                  if (isTvBrowser) {
                    clearLongPressTimer();
                    longPressTriggeredRef.current = false;
                  }
                }}
                onTouchCancel={() => {
                  if (!isTvBrowser) {
                    clearLongPressTimer();
                    longPressTriggeredRef.current = false;
                  }
                }}
                key={genre.id}
                aria-pressed={selectedGenres.includes(String(genre.id))}
                style={getTvGenreButtonStyle(String(genre.id))}
                className={clsx(`
              border
              border-white/10
              rounded-xl
              p-3
              text-white
              text-center
              cursor-pointer
              transition-all
              duration-300
              ease-in-out
              select-none
              text-sm
              whitespace-nowrap
              m-2
              min-w-[150px]
              hover:border-blue-700
              hover:translate-[2px]
              active:translate-[3px]
              ${
                selectedGenres.includes(String(genre.id))
                  ? isTvBrowser
                    ? 'border-blue-500'
                    : 'bg-blue-800 border-blue-900'
                  : deselectedGenres.includes(String(genre.id))
                    ? isTvBrowser
                      ? 'border-red-700 line-through'
                      : 'bg-red-800/50 border-red-900 line-through'
                    : isTvBrowser
                      ? ''
                      : 'bg-gray-800/50'
              }
            `)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default GenreSelector;
