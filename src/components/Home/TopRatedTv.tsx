import CarouselContainer from '../CarouselContainer';
import { useTopRatedTv } from '../../hooks/useTopRated';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';

const TopRatedTv = () => {
  const { data: shows = [], isLoading } = useTopRatedTv();


  return (
    <div className=' mt-20  min-h-[350px]' id='top-tv-section'>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Top Rated TV 🔝</h2>
      {isLoading  ? (
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

export default TopRatedTv;
