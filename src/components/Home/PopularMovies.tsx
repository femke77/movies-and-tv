import { usePopularMovies } from '../../hooks/usePopular';
import { useRef } from 'react';
import CarouselContainer from '../CarouselContainer';

const PopularMovies = () => {
  const { data: movies = [] } = usePopularMovies();
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className='mt-20  min-h-[350px]'>
      <h2 className='text-2xl font-bold mb-8  ml-5'>Popular Movies 📈</h2>
      <CarouselContainer
        id='pop-section'
        ref={ref}
        items={movies}
        itemType='movie'
      />
    </div>
  );
};

export default PopularMovies;
