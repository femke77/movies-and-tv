import CarouselContainer from '../CarouselContainer';
import { usePopularTv } from '../../hooks/usePopular';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';
const PopularTv = () => {
  const { data: shows = [], isLoading } = usePopularTv();


  return (
    <div className=' mt-20  min-h-[350px]' id='pop-tv-section'>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Popular TV 📈</h2>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CarouselContainer items={shows} itemType='tv' />
      )}
    </div>
  );
};

export default PopularTv;
