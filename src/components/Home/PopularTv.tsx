import CarouselContainer from '../CarouselContainer';
import { usePopularTv } from '../../hooks/usePopular';
import { useRef } from 'react';

const PopularTv = () => {
  const { data: shows = [] } = usePopularTv();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className='min-h-[350px]'>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Popular TV 📈</h2>
      <CarouselContainer
        ref={ref}
        items={shows}
        itemType='tv'
        id='pop-tv-section'
      />
    </div>
  );
};

export default PopularTv;
