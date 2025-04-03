import { lazy, useEffect } from 'react';
import SwiperElement from '../components/main/Swiper';
import ContinueWatching from '../components/main/ContinueWatching';
import Network from '../components/main/Network';

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

      <div className='my-28'>
        <TrendingMovies />
        <PopularMovies />
        <TopRatedMovies />
        <TrendingTV />
        <TopRatedTv />
       <Network network_name='Netflix' network_id={213} />
       <Network network_name='Hulu' network_id={453} />
       <Network network_name='Paramount' network_id={2076} />
      </div>
    </>
  );
};

export default Home;
