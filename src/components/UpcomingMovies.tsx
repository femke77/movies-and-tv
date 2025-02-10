import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import SlideContainer from './SlideContainer';

const UpcomingMovies = () => {
  const { data: movies = [] } = useUpcomingMovies();

  return (
    <div className='mt-24'>
      <SlideContainer items={movies} type='movie' headerTxt='Upcoming 👀' />
    </div>
  );
};

export default UpcomingMovies;
