import { lazy } from 'react';
import PopularMovies from '../components/Home/PopularMovies';
import SwiperElement from '../components/Home/Swiper';
import TopRatedMovies from '../components/Home/TopRatedMovies';
import TrendingMovies from '../components/Home/TrendingMovies';
const PopularTv = lazy(() => import('../components/Home/PopularTv'));
const TrendingTV = lazy(() => import('../components/Home/TrendingTv'));
const TopRatedTv = lazy(() => import('../components/Home/TopRatedTv'));


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
        <PopularTv />

      </div>
    </>
  );
};

export default Home;
