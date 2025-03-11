import CarouselContainer from '../CarouselContainer';
import { usePopularTv } from '../../hooks/usePopular';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeltonHome';
const PopularTv = () => {
  const { data: shows = [], isLoading } = usePopularTv();

  return (
    <div className=' mt-20  min-h-[350px]' id='pop-tv-section'>
      <Link to='/explore/popular-tv'>
        <h2 className='text-2xl font-bold mb-6 ml-5'>Popular TV </h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 10 }).map((_, i) => (
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
