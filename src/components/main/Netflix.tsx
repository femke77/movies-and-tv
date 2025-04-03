import { useNetflix } from '../../hooks/useNetflix';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';

const Netflix = () => {
  const { data: items = [], isLoading } = useNetflix();

  return (
    <div className=' mt-20  min-h-[350px]' id='netflix-section'>
      <Link to='/explore/top-series'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>
          Netflix Series{' '}
        </h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 px-4 py-2 w-full  '>
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className=' w-[180px] flex-shrink-0'>
              <ItemCardSkeleton key={i} />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={items} itemType='tv'  />
      )}
    </div>
  );
};

export default Netflix;
