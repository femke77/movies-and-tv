import CarouselContainer from '../CarouselContainer';
import { useTrendingMovies } from '../../hooks/useTrending';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const TrendingMovies = () => {
  const shouldFetch = useIntersectionObserver('trending-section');
  const { data: movies = [], isLoading, isFetching } = useTrendingMovies();

  return (
    <div className='min-h-[350px]' id='trending-section'>
      <h2 className='text-2xl font-bold mb-8 ml-5 '>
        Trending Movies Today 🔥
      </h2>

      {!shouldFetch || isLoading || isFetching ? (
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

export default TrendingMovies;
