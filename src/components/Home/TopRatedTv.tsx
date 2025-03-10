import CarouselContainer from '../CarouselContainer';
import { useTopRatedTv } from '../../hooks/useTopRated';
import { Link } from 'react-router-dom';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeltonHome';

const TopRatedTv = () => {
  const { data: shows = [], isLoading } = useTopRatedTv();

  return (
    <div className=' mt-20  min-h-[350px]' id='top-tv-section'>
       <Link to="/explore/top-series">
      <h2 className='text-2xl font-bold mb-6 ml-5'>All-time Top Rated TV</h2></Link>
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

export default TopRatedTv;
