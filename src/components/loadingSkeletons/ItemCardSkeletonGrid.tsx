import ItemCardSkeleton from './ItemCardSkeleton';

const ItemCardSkeletonGrid = () => {
  return (
    <div className='ml-2 mt-44 md:mt-100'>
      <div className='flex flex-wrap flex-1 gap-4 items-start'>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className='flex w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]'
            >
              <ItemCardSkeleton showRating={false} showGenres={false} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemCardSkeletonGrid;
