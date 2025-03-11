import CarouselContainer from '../CarouselContainer';
import { useTrendingTv } from '../../hooks/useTrending';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';

const TrendingTV = () => {
  const { data: shows = [], isLoading } = useTrendingTv();

  return (
    <div className='mt-20 min-h-[350px]' id='trending-tv-section'>
      <Link to='/explore/tv'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Today's Trending TV</h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length:6 }).map((_, i) => (
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
