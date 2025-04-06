import { useProvider } from '../../hooks/useProvider';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';

const Provider = ({
  provider_name,
  provider_id,
  header,
  media_type,
}: {
  provider_name: string;
  provider_id: number;
  header: string;
    media_type: 'movie' | 'tv';
}) => {
  const { data: items = [], isLoading } = useProvider(
    media_type,
    provider_name,
    provider_id,
  );

  return (
    <div className=' mt-20  min-h-[350px]' id={`${provider_name}-section`}>
      <Link to='/explore/movies'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>{header}</h2>
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
        <CarouselContainer items={items} itemType={media_type} />
      )}
    </div>
  );
};

export default Provider;
