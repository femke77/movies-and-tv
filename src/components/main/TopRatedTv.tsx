import CarouselContainer from '../containers/CarouselContainer';
import { useTopRatedTv } from '../../hooks/useTopRated';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';

const TopRatedTv = () => {
  const { data: shows = [], isLoading } = useTopRatedTv();

  return (
    <div className=' mt-20  min-h-[350px]' id='top-tv-section'>
      <Link to='/explore/top-series'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>All-time Top Rated TV</h2>
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
        <CarouselContainer items={shows} itemType='tv' />
      )}
    </div>
  );
};

export default TopRatedTv;
