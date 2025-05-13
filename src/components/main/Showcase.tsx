import { forwardRef } from 'react';
import CarouselContainer from '../containers/CarouselContainer';
import ItemCardSkeleton from '../loadingSkeletons/ItemCardSkeleton';
import { Link } from 'react-router-dom';
import { IItem } from '../../interfaces/IItem';


const Showcase = forwardRef<
  HTMLDivElement,
  {
    header: string;
    items: IItem[];
    isLoading: boolean;
    media_type: string;
    linkTo: string;
    section_id: string;
    link_state?: { time?: string; genre?: string; provider?: number };
  }
>(function Showcase(
  { header, items, isLoading, media_type, linkTo, section_id, link_state },
  ref,
) {


  
  return (
    <div ref={ref} className='h-[475px]' id={section_id}>
      <div className='w-fit'>
        <Link to={linkTo} state={link_state}>
          <h2 className='text-2xl font-bold mb-6 ml-5 w-fit'>{header}</h2>
        </Link>
      </div>
      {isLoading && items.length === 0 ? (
        <div className='flex gap-3 px-4 py-2 w-full  '>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className=' w-[180px] flex-shrink-0'>
              <ItemCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <CarouselContainer items={items || []} itemType={media_type} />
      )}
    </div>
  );
});

export default Showcase;
