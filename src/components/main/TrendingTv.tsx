import CarouselContainer from '../containers/CarouselContainer';
import { useTrendingTv } from '../../hooks/useTrending';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { useRef } from 'react';

const TrendingTV = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: shows, isLoading } = useTrendingTv(sectionRef);


  return (
    <div
      ref={sectionRef}
      className=' h-[475px]'
      id='trending-tv-section'
    >
      <Link to='/explore/tv'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Today's Trending TV</h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 px-4 py-2 w-full  '>
        
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className=' w-[180px] flex-shrink-0'>
              <ItemCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={shows || []} itemType='tv' />
      )}
    </div>
  );
};

export default TrendingTV;
