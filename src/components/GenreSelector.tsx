import { IGenre } from '../interfaces/IGenre';
import { useWindowSize } from '../hooks/useWindowSize';
import { useState, useRef } from 'react';
import clsx from 'clsx';

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
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const touchDurationThreshold = 500; // Time in ms to consider a touch as a long press
  const isTouchDeviceRef = useRef<boolean>(false);

  const handleTouchStart = (genreId: string) => {
    isTouchDeviceRef.current = true;
    touchStartTimeRef.current = Date.now();
    // long press timer
    const timer = window.setTimeout(() => {
      onUnwantedGenreToggle(genreId);
    }, touchDurationThreshold);

    setLongPressTimer(timer);
  };

  const handleTouchEnd = (genreId: string, e: React.TouchEvent) => {
    e.preventDefault();

    // Clear long press timer
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }

    // If the touch was shorter than the threshold, treat it as a regular click
    const touchDuration = Date.now() - touchStartTimeRef.current;
    if (touchDuration < touchDurationThreshold) {
      onGenreToggle(genreId);
    }
  };

  const handleTouchMove = () => {
    // Cancel long press if user moves finger
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
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

  return (
    <>
      <p className='mx-4 text-white/65 text-md'>
        Genres{' '}
        <span className='text-sm italic'>
          (click or press to include, right click or long press to exclude)
        </span>
      </p>
      <div
        className={clsx(
          `grid gap-2 mt-4 ${
            width < 400
              ? `grid-cols-1`
              : `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1`
          }`,
        )}
      >
        {genres.map((genre) => (
          <button
            onClick={() => handleClick(String(genre.id))}
            onContextMenu={(e) => {
              e.preventDefault();
              onUnwantedGenreToggle(String(genre.id));
            }}
            onTouchStart={() => handleTouchStart(String(genre.id))}
            onTouchEnd={(e) => handleTouchEnd(String(genre.id), e)}
            onTouchMove={handleTouchMove}
            onTouchCancel={() => {
              if (longPressTimer !== null) {
                clearTimeout(longPressTimer);
                setLongPressTimer(null);
              }
            }}
            key={genre.id}
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
              ${
                selectedGenres.includes(String(genre.id))
                  ? 'bg-blue-800 border-blue-900'
                  : deselectedGenres.includes(String(genre.id))
                    ? 'bg-red-800 border-red-900'
                    : 'bg-white/[0.05]'
              }
            `)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default GenreSelector;
