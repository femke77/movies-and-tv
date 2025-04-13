import { useRef } from 'react';
import { usePopularMovies } from '../../hooks/usePopular';
import Showcase from './Showcase';

const PopularMovies = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: movies = [], isLoading } = usePopularMovies(sectionRef);
  return (
    <>
      <Showcase
        ref={sectionRef}
        header='Popular Movies'
        items={movies}
        isLoading={isLoading}
        media_type='movie'
        linkTo='/explore/popular'
        section_id='popular-movies'
      />
    </>
  );
};

export default PopularMovies;
