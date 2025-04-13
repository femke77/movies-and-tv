import { useTrendingMovies } from '../../hooks/useTrending';
import { useRef } from 'react';
import Showcase from './Showcase';


const TrendingMovies = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: movies = [], isLoading } = useTrendingMovies(sectionRef);

  return (
   <>
   <Showcase
      ref={sectionRef}
      header={`Today's Trending Movies`}
      items={movies}
      isLoading={isLoading}
      media_type='movie'
      linkTo='/explore/movies'
      section_id='trending-movies'
      link_state={{ time: 'day' }}

      />
   </>
  );
};

export default TrendingMovies;
