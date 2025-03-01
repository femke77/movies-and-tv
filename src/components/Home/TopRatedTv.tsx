import CarouselContainer from '../CarouselContainer';
import { useTopRatedTv } from '../../hooks/useTopRated';
import { useRef } from 'react';

const TopRatedTv = () => {
  const { data: shows = [] } = useTopRatedTv();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className='min-h-[350px]'>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Top Rated TV 🔝</h2>
      <CarouselContainer
        ref={ref}
        items={shows}
        itemType='tv'
        id='top-tv-section'
      />
    </div>
  );
};

export default TopRatedTv;
