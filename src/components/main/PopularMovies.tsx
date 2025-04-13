import { useRef } from 'react';
import { usePopularMovies } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';

const PopularMovies = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: movies = [], isLoading } = usePopularMovies(sectionRef);
  console.log('popular movies:', movies, isLoading);
  return (
    <div ref={sectionRef} className='h-[475px]' id='pop-movie-section'>
      <Link to='/explore/popular'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Popular Movies</h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 px-4 py-2 w-full'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='w-[180px] flex-shrink-0'>
              <ItemCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={movies} itemType='movie' />
      )}
    </div>
  );
};

export default PopularMovies;
