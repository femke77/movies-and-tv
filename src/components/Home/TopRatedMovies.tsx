import { useTopRatedMovies } from '../../hooks/useTopRated';
import CarouselContainer from '../CarouselContainer';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeltonHome';
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
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 10 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CarouselContainer items={movies} itemType='movie' />
      )}
    </div>
  );
};

export default TopRatedMovies;
