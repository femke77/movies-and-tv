import CarouselContainer from '../CarouselContainer';
import { useTrendingTv } from '../../hooks/useTrending';

import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';

const TrendingTV = () => {
  const { data: shows = [], isLoading } = useTrendingTv();

  return (
    <div className='mt-20 min-h-[350px]' id='trending-tv-section'>
      <h2 className='text-2xl font-bold mb-8 ml-5'>Trending TV Today 🔥</h2>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 8 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CarouselContainer items={shows} itemType='tv' />
      )}
    </div>
  );
};

export default TrendingTV;
