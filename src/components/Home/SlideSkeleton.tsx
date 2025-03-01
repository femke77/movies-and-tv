import clsx from 'clsx';

// Placeholder components
const LogoPlaceholder = () => (
  <div className=' bg-gray-700/30 rounded mb-6 h-32 w-68 animate-pulse'></div>
);

const TextPlaceholder = () => (
  <div className='w-full space-y-2 mb-6'>
    <div className='h-4 bg-gray-700/30 rounded w-full animate-pulse'></div>
    <div className='h-4 bg-gray-700/30 rounded w-full animate-pulse'></div>
    <div className='h-4 bg-gray-700/30 rounded w-3/4 animate-pulse'></div>
  </div>
);

const ButtonPlaceholder = () => (
  <div className='w-28 h-10 bg-gray-700/30 rounded-full animate-pulse'></div>
);

const SlideSkeleton = () => {
  return (
    <div className='swiper-slide bg-black h-full flex items-center py-10 slide-container overflow-hidden '>
      <div className='absolute inset-0 w-full h-full bg-gray-900'>
        <div className='absolute bottom-0 left-0 w-full h-1/8 sm:h-1/2 bg-gradient-to-t from-black to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 to-transparent' />
      </div>
      {/* card content */}
      <div className='max-w-[1800px] mx-auto relative h-full'>
        {/* left, top - genre, release date, title logo */}
        <div
          className='absolute w-full h-full justify-center mt-5 flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10
          [@media(min-width:950px)]:justify-center
          [@media(min-width:950px)]:w-1/2
          [@media(min-width:950px)]:top-1/2
          [@media(min-width:950px)]:transform
          [@media(min-width:950px)]:-translate-y-1/2'
        >
          {/* Genre and date section*/}
          <div
            className={clsx(
              `flex flex-col h-[30px] items-center [@media(min-width:950px)]:items-start `,
            )}
          >
            <div className={`flex justify-start items-start mb-6 pb-6`}>
              <div className='h-4 w-16 bg-gray-700/30  rounded mr-4'></div>
              <div className='h-4 w-16 bg-gray-700/30 rounded mr-4 animate-pulse'></div>
              <div className='h-4 w-2 bg-gray-700/30 rounded-full mr-4 animate-pulse'></div>
              <div className='h-4 w-24 bg-gray-700/30 rounded animate-pulse'></div>
            </div>
          </div>

          {/* Content container */}
          <div className='flex flex-col mt-6 mb-6'>
            {/* Title/logo section */}

            <div
              className={`flex flex-col items-center [@media(min-width:950px)]:items-start`}
            >
              {/* Logo with placeholder */}
              <div className='h-[250] my-6 mt-6 mb-10'>
                <LogoPlaceholder />
              </div>

              {/* Overview text with placeholder */}

              <TextPlaceholder />
            </div>

            {/* Buttons section */}
            <div
              className={clsx(
                `flex flex-row items-center justify-center [@media(min-width:950px)]:justify-start  mt-2 h-[50px]`,
              )}
            >
              <div className='mb-2 mr-10'>
                <ButtonPlaceholder />
              </div>
              <div className='mb-2'>
                <div className='w-12 h-12 bg-gray-700/30 rounded-full animate-pulse'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Poster image with placeholder  */}

        <div className='hidden [@media(min-width:950px)]:block [@media(min-width:950px)]:absolute [@media(min-width:950px)]:right-0 [@media(min-width:950px)]:top-1/2 [@media(min-width:950px)]:transform [@media(min-width:950px)]:-translate-y-1/2 mr-16 md:mr-20 lg:mr-40 mt-5 [@media(min-width:950px)]:h-[450px] [@media(min-width:950px)]:w-[320px] z-10'>
          {/* Poster placeholder */}
          <div
            className={`w-78 h-[450px] rounded-lg bg-gray-800/50 absolute `}
          />

          {/* Actual poster with direct onLoad handler */}
        </div>
      </div>
    </div>
  );
};

export default SlideSkeleton;
