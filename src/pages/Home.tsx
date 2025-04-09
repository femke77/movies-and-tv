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
import Provider from '../components/main/Provider';
import useDocumentTitle from '../hooks/usePageTitles';
import { useActivate } from 'react-activation';

const Home = () => {
  useDocumentTitle('Home | BingeBox');
  useActivate(() => {
    document.title = 'Home | BingeBox';
  });
  useEffect(() => {
    // fixes the scroll position bug on page reload that was showing the contintue watching section
    const isPageReload = !window.performance
      .getEntriesByType('navigation')
      .some(
        (nav) => (nav as PerformanceNavigationTiming).type === 'back_forward',
      );

    if (isPageReload) {
      window.scrollTo(0, 0);
    }
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
        <Network
          header='Top Series on Netflix'
          network_name='Netflix'
          network_id={213}
        />
        <Network
          header='Popular on Hulu'
          network_name='HuluTV'
          network_id={453}
        />
        <Network header='Apple TV+' network_name='AppleTV+' network_id={2552} />
        <Network
          header='Now Streaming on Paramount+'
          network_name='Paramount+'
          network_id={4330}
        />
        <ProductionCo
          header='Marvel Movies'
          company_name='MarvelMovies'
          company_id={420}
        />
        <ProductionCo
          header='Featured Disney Movies'
          company_name='DisneyMovies'
          company_id={2}
        />
        <Provider
          header='Movies on Hulu'
          provider_name='Hulu'
          provider_id={15}
          media_type='movie'
        />
        <Provider
          header='Horror by Shudder'
          provider_name='ShudderMovies'
          provider_id={99}
          media_type='movie'
        />
        <TopRatedTv />
      </div>
    </>
  );
};
Home.displayName = 'home';
export default Home;
