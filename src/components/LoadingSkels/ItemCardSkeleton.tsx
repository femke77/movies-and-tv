const ItemCardSkeleton = () => {
    return (
      <div
        className="relative flex flex-col items-center justify-between w-full bg-black rounded-xl shadow-lg overflow-hidden animate-pulse"
      >
        <div className="w-full">
          {/* Image Skeleton */}
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-700">
            <div className="absolute inset-0 bg-gray-600"></div>
          </div>
        </div>
  
        <div className="flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black">
          <div className="relative -top-13 left-3 w-full">
            <div className="flex min-h-11 items-end justify-between">
              {/* Rating Skeleton */}
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
  
              {/* Genres Skeleton */}
              <div className="flex justify-end flex-wrap gap-1 relative -top-8 right-3.5 sm:right-2 w-full">
                <div className="h-5 w-12 bg-gray-700 rounded-full"></div>
                <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
              </div>
            </div>
  
            {/* Title Skeleton */}
            <div className="w-3/4 h-5 bg-gray-700 rounded mt-2"></div>
            {/* Date & Type Skeleton */}
            <div className="w-1/2 h-4 bg-gray-700 rounded mt-1"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ItemCardSkeleton;
  