import { useTopRatedMovies } from '../../hooks/useTopRated';
import SlideContainer from '../CarouselContainer';
import { useRef } from 'react';

const TopRatedMovies = () => {
  const { data: movies = [] } = useTopRatedMovies();
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className='mt-24'>
      <h2 className='text-2xl font-bold mb-8  ml-5'>Top Rated Movies🔝</h2>
      <SlideContainer
        id='top-section'
        ref={ref}
        items={movies}
        itemType='movie'
      />
    </div>
  );
};

export default TopRatedMovies;
