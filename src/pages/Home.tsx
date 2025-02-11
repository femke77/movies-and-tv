import PopularMovies from '../components/Home/PopularMovies';
import SwiperElement from '../components/Home/Swiper';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import TrendingMovies from '../components/Home/TrendingMovies';

const Home = () => {
  return (
    <>
      <SwiperElement />

      <div className='my-46'>
        <TrendingMovies />
        <PopularMovies />
        <TopRatedMovies />
      </div>
    </>
  );
};

export default Home;
