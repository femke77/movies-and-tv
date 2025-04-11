import CarouselContainer from '../containers/CarouselContainer';
import { usePopularTv } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
const PopularTv = () => {
  const { data: shows = [], isLoading } = usePopularTv();

  return (
    <div className='mt-20 min-h-[350px]' id='pop-tv-section'>
      <Link to='/explore/popular-tv'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Popular TV </h2>
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

export default PopularTv;
