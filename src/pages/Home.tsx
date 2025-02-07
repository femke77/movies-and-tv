import SwiperElement from '../components/Swiper';
import { useNowPlayingMovies } from '../hooks/useNowPlayingMovies';

const Home = () => {

  const { data, isLoading, isError } = useNowPlayingMovies();
  const movies = data?.results;

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error fetching movies </div>;
    }

  return (
    <>
      <SwiperElement movies={movies}  />
    
    </>
  );
};

export default Home;
