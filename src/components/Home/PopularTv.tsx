import CarouselContainer from '../CarouselContainer';
import { usePopularTv } from '../../hooks/usePopular';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ItemCardSkeleton from '../LoadingSkels/ItemCardSkeleton';
const PopularTv = () => {
  const { data: shows = [], isLoading, isFetching } = usePopularTv();
  const shouldFetch = useIntersectionObserver('pop-tv-section');


  return (
    <div className=' mt-20  min-h-[350px]' id="pop-tv-section">
      <h2 className='text-2xl font-bold mb-8 ml-5'>Popular TV 📈</h2>
      {!shouldFetch|| isLoading || isFetching? (
        <div className='flex gap-3 overflow-hidden'>
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
      <CarouselContainer
 
        items={shows}
        itemType='tv'

      />)}
    </div>
  );
};

export default PopularTv;
