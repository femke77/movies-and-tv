import { useNetwork } from '../../hooks/useNetwork';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';

const Network = ({
  network_name,
  network_id,
  header
}: {
  network_name: string;
  network_id: number;
  header: string
}) => {
  const { data: items = [], isLoading } = useNetwork(
    'tv',
    network_name,
    network_id,
  );

  return (
    <div className=' mt-20  min-h-[350px]' id={`${network_name}-section`}>
      <Link to='/explore/tv'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>
         {header}
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
        <CarouselContainer items={items} itemType='tv' />
      )}
    </div>
  );
};

export default Network;
