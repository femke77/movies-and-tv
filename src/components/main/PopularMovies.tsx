import { usePopularMovies } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';

const PopularMovies = () => {
  const { data: movies = [], isLoading } = usePopularMovies();

  return (
    <div className='mt-20  min-h-[350px]' id='pop-section'>
      <Link to='/explore/popular'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>Popular Movies </h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 px-4 py-2 w-full  '>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className=' w-[180px] flex-shrink-0'>
              <ItemCardSkeleton key={i} />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={movies || []} itemType='movie' />
      )}
    </div>
  );
};

export default PopularMovies;
