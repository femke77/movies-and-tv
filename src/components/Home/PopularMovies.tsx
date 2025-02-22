import { usePopularMovies } from '../../hooks/usePopularMovies';
import { useRef } from 'react';
import SlideContainer from '../CarouselContainer';

const PopularMovies = () => {
  const { data: movies = [] } = usePopularMovies();
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className='mt-24'>
      <h2 className='text-2xl font-bold mb-8  ml-5'>Popular Movies📈</h2>
      <SlideContainer
        id='pop-section'
        ref={ref}
        items={movies}
        itemType='movie'
      />
    </div>
  );
};

export default PopularMovies;
