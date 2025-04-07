const TextSkeleton = () => {
  return (
    <div className='mt-34 flex flex-col items-center justify-center w-full'>
      <div className='w-50 h-4 mb-16 bg-gray-800 animate-pulse rounded-md '></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-16'></div>

      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
      <div className='w-[65%] h-4 bg-gray-800 animate-pulse rounded-md mb-2'></div>
    </div>
  );
};
export default TextSkeleton;
