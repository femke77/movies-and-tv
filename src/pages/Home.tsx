import { useEffect } from 'react';
import SwiperElement from '../components/main/Swiper';
import ContinueWatching from '../components/main/ContinueWatching';
import Network from '../components/main/Network';
import ProductionCo from '../components/main/ProductionCo';
import PopularMovies from '../components/main/PopularMovies';
import TrendingMovies from '../components/main/TrendingMovies';
import TopRatedMovies from '../components/main/TopRatedMovies';
import TrendingTV from '../components/main/TrendingTv';
import TopRatedTv from '../components/main/TopRatedTv';

const Home = () => {
  useEffect(() => {
    // fixes the scroll position on page reload
    const isPageReload = !window.performance
      .getEntriesByType('navigation')
      .some(
        (nav) => (nav as PerformanceNavigationTiming).type === 'back_forward',
      );

    if (isPageReload) {
      window.scrollTo(0, 0);
    }
  }, []);
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
        <ProductionCo company_name='Marvel Movies' company_id={420} />
        <ProductionCo company_name='Featured Disney' company_id={2} />
        <ProductionCo company_name='Neon/Hulu Movies' company_id={90733} />

        <TopRatedTv />
      </div>
    </>
  );
};
Home.displayName = 'home';
export default Home;
