import { useTopRatedMovies } from '../../hooks/useTopRated';
import CarouselContainer from '../CarouselContainer';
import { useRef } from 'react';

const TopRatedMovies = () => {
  const { data: movies = [] } = useTopRatedMovies();
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className=' mt-20  min-h-[350px]'>
      <h2 className='text-2xl font-bold mb-8  ml-5'>Top Rated Movies 🔝</h2>
      <CarouselContainer
        id='top-section'
        ref={ref}
        items={movies}
        itemType='movie'
      />
    </div>
  );
};

export default TopRatedMovies;
