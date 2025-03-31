const CastDetailSkeleton = () => {
  return (
    <div className='text-white my-24 flex items-center flex-col'>
      {/* Name skeleton */}
      <div className='bg-gray-700 h-10 w-64 rounded-lg mb-6 animate-pulse'></div>

      {/* Image skeleton */}
      <div className='w-50 h-80 relative overflow-hidden rounded-lg bg-gray-700 animate-pulse'></div>

      {/* Link skeleton */}
      <div className='mx-30 text-center mt-3'>
        <div className='bg-gray-700 h-5 w-64 mx-auto rounded mt-3 animate-pulse'></div>

        {/* Personal info skeletons */}
        <div className='bg-gray-700 h-5 w-48 mx-auto rounded mt-3 animate-pulse'></div>
        <div className='bg-gray-700 h-5 w-40 mx-auto rounded mt-3 animate-pulse'></div>
        <div className='bg-gray-700 h-5 w-56 mx-auto rounded mt-3 animate-pulse'></div>

        {/* Biography header skeleton */}
        <div className='bg-gray-700 h-6 w-24 mx-auto rounded mt-5 animate-pulse'></div>

        {/* Biography text skeleton */}
        <div className='mt-3 mb-19 flex flex-col items-center'>
          <div className='bg-gray-700 h-4 w-full rounded my-1 animate-pulse'></div>
          <div className='bg-gray-700 h-4 w-full rounded my-1 animate-pulse'></div>
          <div className='bg-gray-700 h-4 w-full rounded my-1 animate-pulse'></div>
          <div className='bg-gray-700 h-4 w-full rounded my-1 animate-pulse'></div>
          <div className='bg-gray-700 h-4 w-3/4 rounded my-1 animate-pulse'></div>
        </div>
      </div>

      {/* Works section skeleton */}
      <div className='bg-gray-700 h-8 w-48 rounded mt-6 animate-pulse'></div>

      {/* Carousel skeleton */}
      <div className='w-full mt-4 overflow-hidden'>
        <div className='flex space-x-4 mt-2'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className='flex-none w-36'>
              <div className='bg-gray-700 h-52 w-full rounded animate-pulse'></div>
              <div className='bg-gray-700 h-5 w-full rounded mt-2 animate-pulse'></div>
              <div className='bg-gray-700 h-4 w-3/4 rounded mt-2 animate-pulse'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastDetailSkeleton;
