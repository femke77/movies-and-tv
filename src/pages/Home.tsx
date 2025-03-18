import { lazy } from 'react';
import SwiperElement from '../components/main/Swiper';

const PopularMovies = lazy(() => import('../components/main/PopularMovies'));
const TrendingMovies = lazy(() => import('../components/main/TrendingMovies'));
const TopRatedMovies = lazy(() => import('../components/main/TopRatedMovies'));
const PopularTv = lazy(() => import('../components/main/PopularTv'));
const TrendingTV = lazy(() => import('../components/main/TrendingTv'));
const TopRatedTv = lazy(() => import('../components/main/TopRatedTv'));

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
