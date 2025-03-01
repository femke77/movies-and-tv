import CarouselContainer from '../CarouselContainer';
import { useTrendingMovies } from '../../hooks/useTrending';
import { useRef } from 'react';

const TrendingMovies = () => {
  const { data: movies = [] } = useTrendingMovies();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className='min-h-[350px]'>
      <h2 className='text-2xl font-bold mb-8 ml-5 '>
        Trending Movies Today 🔥
      </h2>
      <CarouselContainer
        ref={ref}
        items={movies}
        itemType='movie'
        id='trending-section'
      />
    </div>
  );
};

export default TrendingMovies;
