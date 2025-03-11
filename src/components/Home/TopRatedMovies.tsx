import { useTopRatedMovies } from '../../hooks/useTopRated';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';

const TopRatedMovies = () => {
  const { data: movies = [], isLoading } = useTopRatedMovies();

  return (
    <div className=' mt-20  min-h-[350px]' id='top-section'>
      <Link to='/explore/toprated'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>
          All-time Top Rated Movies{' '}
        </h2>
      </Link>
      {isLoading ? (
        <div className="flex gap-3 px-4 py-2 w-full  ">
        {Array.from({ length: 15 }).map((_, i) => (
      <div className=" w-[180px] flex-shrink-0">
          <ItemCardSkeleton key={i} />
      </div>
        ))}
    </div>
      ) : (
        <CarouselContainer items={movies} itemType='movie' />
      )}
    </div>
  );
};

export default TopRatedMovies;
