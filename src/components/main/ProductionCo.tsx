import { useProductionCo } from '../../hooks/useCompany';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';

const ProductionCo = ({
  company_name,
  company_id,
  header,
}: {
  company_name: string;
  company_id: number;
  header: string;
}) => {
  const { data: items = [], isLoading } = useProductionCo(
    'movie',
    company_name,
    company_id
  );

  return (
    <div className=' mt-20  min-h-[350px]' id={`${company_name}-section`}>
      <Link to='/explore/movies'>
        <h2 className='text-2xl font-bold mb-6  ml-5'>{header}</h2>
      </Link>
      {isLoading ? (
        <div className='flex gap-3 px-4 py-2 w-full  '>
          {Array.from({ length: 15 }).map(() => (
            <div className=' w-[180px] flex-shrink-0'>
              <ItemCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={items} itemType='movie' />
      )}
    </div>
  );
};

export default ProductionCo;
