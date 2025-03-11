import { lazy } from 'react';

import SwiperElement from '../components/home/Swiper';

const PopularMovies = lazy(() => import('../components/home/PopularMovies'));
const TrendingMovies = lazy(() => import('../components/home/TrendingMovies'));
const TopRatedMovies = lazy(() => import('../components/home/TopRatedMovies'));
const PopularTv = lazy(() => import('../components/home/PopularTv'));
const TrendingTV = lazy(() => import('../components/home/TrendingTv'));
const TopRatedTv = lazy(() => import('../components/home/TopRatedTv'));

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
