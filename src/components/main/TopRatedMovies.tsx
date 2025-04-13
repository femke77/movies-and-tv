import { useTopRatedMovies } from '../../hooks/useTopRated';
import Showcase from './Showcase';
import { useRef } from 'react';
const TopRatedMovies = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: movies = [], isLoading } = useTopRatedMovies(sectionRef);

  return (
    <>
      <Showcase
        ref={sectionRef}
        header='All-time Top Rated Movies'
        items={movies}
        isLoading={isLoading}
        media_type='movie'
        linkTo='/explore/toprated'
        section_id='toprated-movies'
      />
    </>
  );
};

export default TopRatedMovies;
