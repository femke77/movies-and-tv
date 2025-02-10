import { usePopularMovies } from '../../hooks/usePopularMovies';
import { useRef } from 'react';
import SlideContainer from '../SlideContainer';

const PopularMovies = () => {
  const { data: movies = [] } = usePopularMovies();
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className='mt-24'>
      <SlideContainer
        id='pop-section'
        ref={ref}
        items={movies}
        itemType='movies'
        headerTxt='Popular 📈'
      />
    </div>
  );
};

export default PopularMovies;
