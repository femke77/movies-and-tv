import { useTopRatedMovies } from '../../hooks/useTopRated';
import SlideContainer from '../SlideContainer';
import { useRef } from 'react';

const TopRatedMovies = () => {
  const { data: movies = [] } = useTopRatedMovies();
  const ref = useRef<HTMLDivElement | null>(null); 
  
  return (
    <div className='mt-24'>
      <SlideContainer ref={ref} items={movies} itemType='movie' headerTxt='Top Rated 🔝' />
    </div>
  );
};

export default TopRatedMovies;
