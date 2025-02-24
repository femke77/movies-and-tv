import PopularMovies from '../components/Home/PopularMovies';
import SwiperElement from '../components/Home/Swiper';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import TopRatedTv from '../components/Home/TopRatedTv';
import TrendingMovies from '../components/Home/TrendingMovies';
import TrendingTV from '../components/Home/TrendingTv';
import PopularTv from '../components/Home/PopularTv';

// TODO skeletons with suspense

const Home = () => {
  return (
    <>
      <SwiperElement />

      <div className='my-46'>
        <TrendingMovies />
        <PopularMovies />
        <TopRatedMovies />
        <TrendingTV />
        <TopRatedTv />
        <PopularTv/>
      </div>
    </>
  );
};

export default Home;
