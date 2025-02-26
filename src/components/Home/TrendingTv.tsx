import CarouselContainer from '../CarouselContainer';
import { useTrendingTv } from '../../hooks/useTrending';
import { useRef } from 'react';

const TrendingTV = () => {
  const { data: shows = [] } = useTrendingTv();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Trending TV Today 🔥</h2>
      <CarouselContainer
        ref={ref}
        items={shows}
        itemType='tv'
        id='trending-tv-section'
      />
    </div>
  );
};

export default TrendingTV;
