import { usePopularMovies } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import CarouselContainer from '../CarouselContainer';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeltonHome';

const PopularMovies = () => {
  const { data: movies = [], isLoading } = usePopularMovies();

  return (
    <div className='mt-20  min-h-[350px]' id='pop-section'>
      <Link to='/explore/popular'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>Popular Movies </h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CarouselContainer items={movies || []} itemType='movie' />
      )}
    </div>
  );
};

export default PopularMovies;
