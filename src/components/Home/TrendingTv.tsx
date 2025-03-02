import CarouselContainer from '../CarouselContainer';
import { useTrendingTv } from '../../hooks/useTrending';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';

const TrendingTV = () => {
  const { data: shows = [], isLoading, isFetching } = useTrendingTv();
  const shouldFetch = useIntersectionObserver('trending-tv-section');


  return (
    <div className='mt-20 min-h-[350px]' id="trending-tv-section">
      <h2 className='text-2xl font-bold mb-8 ml-5'>Trending TV Today 🔥</h2>
      {!shouldFetch|| isLoading || isFetching ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
      <CarouselContainer
    
        items={shows}
        itemType='tv'

      />)}
    </div>
  );
};

export default TrendingTV;
