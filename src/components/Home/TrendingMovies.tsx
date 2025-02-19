import SlideContainer from '../SlideContainer';
import { useTrendingMovies } from '../../hooks/useTrending';
import { useRef } from 'react';

const TrendingMovies = () => {
  const { data: movies = [] } = useTrendingMovies();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <SlideContainer
      ref={ref}
      items={movies}
      itemType='movie'
      headerTxt='Trending Movies🔥'
      id='trending-section'
    />
  );
};

export default TrendingMovies;
