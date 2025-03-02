const ItemCardSkeleton = ({
  showRating = true,
  showGenres = false,
}: {
  showRating?: boolean;
  showGenres?: boolean;
}) => {
  return (
    <div className='relative flex flex-col items-center justify-between w-full bg-black rounded-xl shadow-lg overflow-hidden'>
      {/* Poster placeholder */}
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg'>
        <div className='absolute inset-0 bg-gray-800 animate-pulse'>
          {/* Shimmer effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent shimmer-animation'></div>
        </div>
      </div>

      {/* Content area */}
      <div className='flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black'>
        <div className='relative -top-13 left-3 w-full'>
          <div className='flex min-h-11 items-end justify-between'>
            {/* Rating skeleton */}
            {showRating && (
              <div className='relative z-10'>
                <div className='w-12 h-12 rounded-full bg-gray-800 animate-pulse'></div>
              </div>
            )}

            {/* Genres skeleton */}
            {showGenres && (
              <div className='flex justify-end flex-wrap gap-1 relative -top-8 right-3.5 sm:right-2 w-full z-10'>
                <div className='h-6 w-16 bg-gray-800 rounded-full animate-pulse'></div>
                <div className='h-6 w-20 bg-gray-800 rounded-full animate-pulse'></div>
              </div>
            )}
          </div>

          {/* Title skeleton */}
          <div
            className={`w-3/4 h-6 bg-gray-800 rounded animate-pulse -ml-2 mt-1`}
          ></div>

          {/* Date and type skeleton */}
          <div className='w-1/2 h-4 bg-gray-800 rounded animate-pulse -ml-2 mt-2'></div>
        </div>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
