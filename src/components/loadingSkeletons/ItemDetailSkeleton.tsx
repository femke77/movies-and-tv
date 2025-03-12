const SkeletonChip = () => (
  <div className='h-6 w-16 bg-gray-700/30 rounded-full animate-pulse'></div>
);

const SkeletonText = ({ width }: { width: string }) => (
  <div className={`h-4 bg-gray-700/30 rounded animate-pulse ${width}`}></div>
);

const SkeletonPoster = () => (
  <div className='w-[300px] md:w-[340px] h-[500px] bg-gray-700/30 rounded-lg animate-pulse'></div>
);

const SkeletonRating = () => (
  <div className='w-20 h-20 bg-gray-700/30 rounded-full animate-pulse'></div>
);

const SkeletonButton = () => (
  <div className='w-32 h-10 bg-gray-700/30 rounded-full animate-pulse'></div>
);

const ItemDetailSkeleton = () => {
  return (
    <section
      id='item-detail'
      className='max-w-[1800px] relative flex flex-wrap pt-30 justify-center mx-auto px-4'
    >
      {/* Blurred Background */}
      <div className='fixed inset-0 bg-gray-800 opacity-40 z-0'></div>

      <div className='relative z-10 w-full flex flex-wrap'>
        {/* Left Section - Poster */}
        <div className='relative md:w-[300px] h-auto mb-12 flex flex-wrap mx-auto md:ml-3'>
          <SkeletonPoster />
        </div>

        {/* Right Section - Details */}
        <section className='mr-4 flex-grow md:max-h-[525px] basis-full md:basis-2/5 ml-12 pr-6 overflow-auto flex flex-col items-center md:items-start'>
          <SkeletonText width='w-3/4' />
          <SkeletonText width='w-1/2 mb-3' />

          {/* Genres */}
          <div className='flex flex-wrap gap-2 mb-4'>
            <SkeletonChip />
            <SkeletonChip />
            <SkeletonChip />
          </div>

          {/* Rating + Watch Button */}
          <div className='flex items-center mb-4 md:mb-0'>
            <SkeletonRating />
            <div className='pl-6 h-20 sm:pl-8 pt-4'>
              <SkeletonButton />
            </div>
          </div>

          {/* Overview */}
          <SkeletonText width='w-full mb-2' />
          <SkeletonText width='w-full mb-2' />
          <SkeletonText width='w-3/4 mb-6' />

          {/* Movie Details */}
          <div className='flex flex-wrap md:flex-nowrap space-x-10 mb-4'>
            <SkeletonText width='w-20' />
            <SkeletonText width='w-28' />
            <SkeletonText width='w-16' />
          </div>

          {/* Budget, Revenue, ROI */}
          <div className='flex flex-wrap md:flex-nowrap space-x-10 mb-4'>
            <SkeletonText width='w-24' />
            <SkeletonText width='w-24' />
            <SkeletonText width='w-16' />
          </div>

          {/* Director & Writer */}
          <div className='flex md:flex-col flex-wrap space-x-10 mb-4'>
            <SkeletonText width='w-40' />
            <SkeletonText width='w-40' />
          </div>
        </section>

        {/* Cast Section */}
        <section className='w-full mt-30'>
          <SkeletonText width='w-32 mx-auto mb-3' />
          <div className='flex flex-wrap gap-4'>
            <SkeletonChip />
            <SkeletonChip />
            <SkeletonChip />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ItemDetailSkeleton;
