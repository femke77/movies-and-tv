import { lazy, useEffect } from 'react';
import SwiperElement from '../components/main/Swiper';
import ContinueWatching from '../components/main/ContinueWatching';

const PopularMovies = lazy(() => import('../components/main/PopularMovies'));
const TrendingMovies = lazy(() => import('../components/main/TrendingMovies'));
const TopRatedMovies = lazy(() => import('../components/main/TopRatedMovies'));
const PopularTv = lazy(() => import('../components/main/PopularTv'));
const TrendingTV = lazy(() => import('../components/main/TrendingTv'));
const TopRatedTv = lazy(() => import('../components/main/TopRatedTv'));


const Home = () => {
  useEffect(() => {
    document.title = 'Home | BingeBox';
  }, []);

  return (
    <>
      <SwiperElement />
      <div className='mt-46'>
        <ContinueWatching />
      </div>

      <div className='my-40'>
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
