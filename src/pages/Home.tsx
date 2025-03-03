import { lazy } from 'react';

import SwiperElement from '../components/Home/Swiper';
import WatchDescription from '../components/WatchDescription';

const PopularMovies = lazy(() => import('../components/Home/PopularMovies'));
const TrendingMovies = lazy(() => import('../components/Home/TrendingMovies'));
const TopRatedMovies = lazy(() => import('../components/Home/TopRatedMovies'));
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

        <WatchDescription />
      </div>
    </>
  );
};

export default Home;
