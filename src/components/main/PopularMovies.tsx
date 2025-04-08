import { useEffect, useState } from 'react';
import { usePopularMovies } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';

const PopularMovies = () => {
  const { data: movies = [], isLoading } = usePopularMovies();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Slight delay to allow DOM update before fade-in
      const timeout = setTimeout(() => setShowContent(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setShowContent(false);
    }
  }, [isLoading]);

  return (
    <div className='mt-20 min-h-[350px]' id='pop-section'>
      <Link to='/explore/popular'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Popular Movies</h2>
      </Link>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {isLoading ? (
          <div className='flex gap-3 px-4 py-2 w-full'>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className='TEST TEST w-[180px] flex-shrink-0'
              >
                <ItemCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <CarouselContainer items={movies} itemType='movie' />
        )}
      </div>
    </div>
  );
};

export default PopularMovies;
