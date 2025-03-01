const LogoPlaceholder = () => (
    <div className="w-64 h-16 bg-gray-700/30 animate-pulse rounded mb-8"></div>
  );
  
  const TextPlaceholder = () => (
    <div className="w-full space-y-2 mb-6">
      <div className="h-4 bg-gray-700/30 animate-pulse rounded w-3/4"></div>
      <div className="h-4 bg-gray-700/30 animate-pulse rounded w-full"></div>
      <div className="h-4 bg-gray-700/30 animate-pulse rounded w-1/2"></div>
    </div>
  );
  
  const ButtonPlaceholder = () => (
    <div className="w-28 h-10 bg-gray-700/30 rounded-full animate-pulse"></div>
  );
  
  const SlideSkeleton = () => {
    return (
      <div className="swiper-slide bg-black h-full flex items-center py-12 slide-container mt-20">
        {/* Background gradient */}
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          <div className="absolute bottom-0 left-0 w-full h-1/8 sm:h-1/2 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 to-transparent" />
        </div>
  
        {/* Content container */}
        <div className="max-w-[1800px] mx-auto relative h-full">
          <div
            className="absolute w-full h-full flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10
            [@media(min-width:950px)]:justify-center
            [@media(min-width:950px)]:w-1/2 
            [@media(min-width:950px)]:top-1/2
            [@media(min-width:950px)]:transform 
            [@media(min-width:950px)]:-translate-y-1/2"
          >
            {/* Genre + Date Section */}
            <div className="flex flex-col h-[40px] items-center [@media(min-width:950px)]:items-start mt-4">
              <div className="flex justify-start items-start mb-8 pb-6">
                <div className="h-4 w-16 bg-gray-700/30 animate-pulse rounded mr-4"></div>
                <div className="h-4 w-16 bg-gray-700/30 animate-pulse rounded mr-4"></div>
                <div className="h-4 w-2 bg-gray-700/30 animate-pulse rounded-full mr-4"></div>
                <div className="h-4 w-24 bg-gray-700/30 animate-pulse rounded"></div>
              </div>
            </div>
  
            {/* Title + Overview */}
            <div className="flex flex-col mt-8 mb-6  items-center 
              [@media(min-width:950px)]:items-start">
              <div className="h-[100px] my-8">
                <LogoPlaceholder />
              </div>
              <TextPlaceholder />
            </div>
  
            {/* Buttons Section */}
            <div
              className="flex flex-row items-center justify-center 
              [@media(min-width:950px)]:justify-start mt-2 h-[150px]"
            >
              <div className="mb-2 mr-10">
                <ButtonPlaceholder />
              </div>
              <div className="mb-2">
                <div className="w-12 h-12 bg-gray-700/30 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
  
          {/* Poster Placeholder */}
          <div className="hidden [@media(min-width:950px)]:block [@media(min-width:950px)]:absolute 
          [@media(min-width:950px)]:right-0 [@media(min-width:950px)]:top-1/2 
          [@media(min-width:950px)]:transform [@media(min-width:950px)]:-translate-y-1/2 
          mr-16 md:mr-20 lg:mr-40 mt-5 [@media(min-width:950px)]:h-[450px] [@media(min-width:950px)]:w-[320px]">
            <div className="w-78 h-[450px] bg-gray-700/30 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SlideSkeleton;
  