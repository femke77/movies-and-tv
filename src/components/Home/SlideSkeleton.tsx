import clsx from 'clsx';
import { useWindowSize } from '../../hooks/useWindowSize';

const SlideSkeleton = () => {
  const { width } = useWindowSize();

  return (
    <>
      <div className='h-full bg-black flex items-center py-10 z-0'>
        {/* Skeleton background with gradient */}
        <div className='relative w-full h-full bg-gray-900 z-0'>
          {/* gradient overlays */}
          <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-0' />
          <div className='absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0' />

          {/* card content */}
          <div className='max-w-[1800px] mx-auto relative h-full z-0'>
            {/* left content area */}
            <div
              className={clsx(`absolute flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10 z-10
                ${
                  width < 950
                    ? 'w-full h-full justify-center'
                    : 'w-1/2 top-1/2 transform -translate-y-1/2'
                }`)}
            >
              {/* Genre and date section */}
              <div
                className={clsx(
                  `flex flex-col ${
                    width < 950 ? 'items-center' : 'items-start'
                  }`,
                )}
              >
                <div className='flex justify-start items-center mb-6'>
                  {/* Skeleton for genres */}
                  <div className='h-4 w-16 bg-gray-700 rounded shimmer-effect mr-4'></div>
                  <div className='h-4 w-16 bg-gray-700 rounded shimmer-effect mr-4'></div>
                  <div className='h-4 w-2 bg-gray-700 rounded-full shimmer-effect mr-4'></div>
                  <div className='h-4 w-24 bg-gray-700 rounded shimmer-effect'></div>
                </div>
              </div>

              {/* Content container */}
              <div className='flex flex-col'>
                {/* Title/logo skeleton */}
                <div
                  className={`flex flex-col ${
                    width < 950 ? 'items-center' : 'items-start'
                  }`}
                >
                  {/* Skeleton for logo/title */}
                  <div className='h-36 w-64 bg-gray-700 rounded shimmer-effect mb-6'></div>

                  {/* Skeleton for overview text */}
                  <div className='w-full space-y-3 mb-6'>
                    <div className='h-4 bg-gray-700 rounded shimmer-effect'></div>
                    <div className='h-4 bg-gray-700 rounded shimmer-effect'></div>
                    <div className='h-4 bg-gray-700 rounded w-3/4 shimmer-effect'></div>
                  </div>
                </div>

                {/* Buttons section skeleton */}
                <div
                  className={clsx(
                    `flex flex-row items-center ${
                      width < 950 ? 'justify-center' : 'justify-start'
                    } mt-2`,
                  )}
                >
                  <div className='mb-2 mr-10'>
                    {/* Watch button skeleton */}
                    <div className='h-10 w-32 bg-gray-700 rounded-full shimmer-effect'></div>
                  </div>
                  <div className='mb-2'>
                    {/* Rating skeleton */}
                    <div className='h-8 w-16 bg-gray-700 rounded-full shimmer-effect'></div>
                  </div>
                </div>
              </div>
            </div>

            {/* right side - poster image skeleton */}
            {width >= 950 && (
              <div className='absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 md:mr-20 lg:mr-40 z-10'>
                {/* Poster skeleton */}
                <div className='w-64 h-96 bg-gray-700 rounded-lg shimmer-effect'></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideSkeleton;

// old no shimmer effect

// import clsx from "clsx";
// import { useWindowSize } from "../../hooks/useWindowSize";

// const SlideSkeleton = () => {
//   const { width } = useWindowSize();

//   return (
//     <div className="h-full bg-black flex items-center py-10 z-0">
//       {/* Skeleton background with gradient */}
//       <div className="relative w-full h-full bg-gray-900 z-0">
//         {/* gradient overlays */}
//         <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-0" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-0" />

//         {/* card content */}
//         <div className="max-w-[1800px] mx-auto relative h-full z-0">
//           {/* left content area */}
//           <div
//             className={clsx(`absolute flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10 z-10
//               ${
//                 width < 950
//                   ? "w-full h-full justify-center"
//                   : "w-1/2 top-1/2 transform -translate-y-1/2"
//               }`)}
//           >
//             {/* Genre and date section */}
//             <div
//               className={clsx(`flex flex-col ${
//                 width < 950 ? "items-center" : "items-start"
//               }`)}
//             >
//               <div className="flex justify-start items-center mb-6">
//                 {/* Skeleton for genres */}
//                 <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mr-4"></div>
//                 <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mr-4"></div>
//                 <div className="h-4 w-2 bg-gray-700 rounded-full animate-pulse mr-4"></div>
//                 <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
//               </div>
//             </div>

//             {/* Content container */}
//             <div className="flex flex-col">
//               {/* Title/logo skeleton */}
//               <div
//                 className={`flex flex-col ${
//                   width < 950 ? "items-center" : "items-start"
//                 }`}
//               >
//                 {/* Skeleton for logo/title */}
//                 <div className="h-12 w-64 bg-gray-700 rounded animate-pulse mb-6"></div>

//                 {/* Skeleton for overview text */}
//                 <div className="w-full space-y-3 mb-6">
//                   <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
//                   <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
//                   <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
//                 </div>
//               </div>

//               {/* Buttons section skeleton */}
//               <div
//                 className={clsx(`flex flex-row items-center ${
//                   width < 950 ? "justify-center" : "justify-start"
//                 } mt-2`)}
//               >
//                 <div className="mb-2 mr-10">
//                   {/* Watch button skeleton */}
//                   <div className="h-10 w-32 bg-gray-700 rounded-full animate-pulse"></div>
//                 </div>
//                 <div className="mb-2">
//                   {/* Rating skeleton */}
//                   <div className="h-8 w-16 bg-gray-700 rounded-full animate-pulse"></div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* right side - poster image skeleton */}
//           {width >= 950 && (
//             <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 md:mr-20 lg:mr-40 z-10">
//               {/* Poster skeleton */}
//               <div className="w-64 h-96 bg-gray-700 rounded-lg animate-pulse"></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlideSkeleton;
