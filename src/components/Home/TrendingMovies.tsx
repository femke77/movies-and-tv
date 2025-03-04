import CarouselContainer from '../CarouselContainer';
import { useTrendingMovies } from '../../hooks/useTrending';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';



const TrendingMovies = () => {


  const { data: movies=[], isLoading} = useTrendingMovies();

  
  return (
    <div className='min-h-[350px]' id='trending-section'>
      <h2 className='text-2xl font-bold mb-8 ml-5 '>
        Trending Movies Today 🔥
      </h2>

      {isLoading && movies.length === 0 ? (
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

export default TrendingMovies;
