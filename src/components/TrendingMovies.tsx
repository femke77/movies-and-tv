import { useRef } from 'react';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import ItemCard from './ItemCard';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const TrendingMovies = () => {
  const { data: movies = [], error, isLoading } = useTrendingMovies();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative w-full'>
      <h2 className='text-2xl font-bold mb-8'>Trending 🔥</h2>
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className='absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black transition'
      >
        <ChevronLeftIcon className='w-8 h-8 pr-[4px]' />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className='flex space-x-4 px-4 py-2 w-full overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className='snap-start'>
            <ItemCard item={movie} type="movie"/>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className='absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black transition'
      >
        <ChevronRightIcon className='w-8 h-8 pl-[3px]' />
      </button>
    </div>
  );
};

export default TrendingMovies;
