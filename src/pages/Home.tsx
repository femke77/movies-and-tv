import { lazy, useEffect } from 'react';
import SwiperElement from '../components/main/Swiper';
import ContinueWatching from '../components/main/ContinueWatching';

const Network = lazy(() => import('../components/main/Network'));
const ProductionCo = lazy(() => import('../components/main/ProductionCo'));
const PopularMovies = lazy(() => import('../components/main/PopularMovies'));
const TrendingMovies = lazy(() => import('../components/main/TrendingMovies'));
const TopRatedMovies = lazy(() => import('../components/main/TopRatedMovies'));
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
        <Network network_name='Netflix' network_id={213} />
        <Network network_name='Hulu' network_id={453} />
        <Network network_name='Apple TV+' network_id={2552} />
        <Network network_name='Paramount' network_id={2076} />
        <ProductionCo company_name='Neon Movies' company_id={90733} />
        <ProductionCo company_name='Marvel Movies' company_id={420} />

        <TopRatedTv />
      </div>
    </>
  );
};

export default Home;
