const WatchPageSkeleton = () => {
  return (
    <div className='min-h-screen pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto'>
        <div className='primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          {/* Header Skeleton */}
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div className='w-8 h-8 bg-[#333] rounded animate-pulse'></div>
            <div className='flex-1 mx-6 h-6 bg-[#333] rounded animate-pulse'></div>
            <div className='w-8 h-8 bg-[#333] rounded animate-pulse'></div>
          </div>

          <main>
            {/* Iframe Skeleton */}
            <div className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]'>
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10'>
                <div className='text-white text-center'>
                  <div className='inline-block w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-2'></div>
                  <p className='text-sm text-gray-300 animate-pulse'>
                    Loading stream...
                  </p>
                </div>
              </div>
            </div>

            {/* Description Skeleton */}
            <div className='rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px] space-y-3'>
              <div className='h-6 w-1/2 bg-[#333] rounded animate-pulse'></div>
              <div className='h-4 w-1/4 bg-[#333] rounded animate-pulse'></div>
              <div className='h-4 w-1/4 bg-[#333] rounded animate-pulse'></div>
              <div className='h-4 w-full bg-[#333] rounded animate-pulse'></div>
              <div className='h-4 w-[90%] bg-[#333] rounded animate-pulse'></div>
              <div className='h-4 w-[80%] bg-[#333] rounded animate-pulse'></div>
            </div>
          </main>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className='secondary lg:w-[400px] lg:flex-shrink-0'>
          <div className='sidebar bg-[#1f1f1f] max-h-[800px] flex flex-col rounded-lg p-4 space-y-3'>
            {Array.from({ length: 9 }).map(() => (
              <div className='h-10 bg-[#333] rounded animate-pulse'></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WatchPageSkeleton;
