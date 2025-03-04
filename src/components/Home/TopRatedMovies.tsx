import { useTopRatedMovies } from '../../hooks/useTopRated';
import CarouselContainer from '../CarouselContainer';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';

const TopRatedMovies = () => {
  const { data: movies = [], isLoading } = useTopRatedMovies();

  return (
    <div className=' mt-20  min-h-[350px]' id='top-section'>
      <h2 className='text-2xl font-bold mb-8  ml-5'>Top Rated Movies 🔝</h2>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 6 }).map((_, i) => (
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
