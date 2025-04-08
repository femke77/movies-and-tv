const HistoryPageSkeleton = () => {
  return (
    <div className='z-10 w-full h-full mt-26'>
      <div className='fixed inset-0 z-0 bg-gradient-to-r from-black to-neutral-800' />

      {/* Continue Watching Skeleton Header */}
      <h1 className='z-10 top-7 ml-6 mb-6 relative text-2xl font-semibold text-gray-500'>
        Continue Watching
      </h1>

      {/* Carousel Skeleton (5 Cards) */}
      <div className='z-10 mt-10 ml-6 flex gap-4 overflow-x-auto pr-6'>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='w-[320px] h-[220px] rounded-lg bg-gray-800 animate-pulse flex-shrink-0'
          />
        ))}
      </div>

      {/* Previous Search History Skeleton Header */}
      <div className='z-10 flex justify-between items-end mt-6'>
        <h1 className='z-10 mt-12 text-2xl font-semibold ml-6 text-gray-500'>
          Previous Search History
        </h1>
        <div className='bg-gray-800 z-10 h-7 w-[120px] rounded-lg mr-6 animate-pulse' />
      </div>

      {/* Search Results Skeleton (8 Rows) */}
      <div className='z-10 flex flex-col gap-2 mt-4 ml-6'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='w-[200px] h-5 bg-gray-800 rounded animate-pulse'
          />
        ))}
      </div>
    </div>
  );
};
export default HistoryPageSkeleton;
