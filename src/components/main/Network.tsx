import { useNetwork } from '../../hooks/useNetwork';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
const Network = ({
  network_name,
  network_id,
  header,
}: {
  network_name: string;
  network_id: number;
  header: string;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: items = [], isLoading } = useNetwork(
    'tv',
    network_name,
    network_id,
    sectionRef,
  );

  return (
    <div
      ref={sectionRef}
      className='h-[475px]'
      id={`${network_name}-section`}
    >
      <Link to='/explore/tv'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>{header}</h2>
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
        <CarouselContainer items={items} itemType='tv' />
      )}
    </div>
  );
};

export default Network;
