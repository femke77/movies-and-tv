import { useState } from 'react';
import TrendingToggle from '../buttons/TrendingToggle';
import Explore from './ExploreDisplay';
import { useInfiniteTrendingQuery } from '../../hooks/useSearchAndDiscover';
import BackButton from '../buttons/BackBtn';
import { isSmartTvBrowser } from '../../utils/helpers';
const TrendingContainer = ({
  mediaType,
  heading,
}: {
  mediaType: string;
  heading: string;
}) => {
  const [timePeriod, setTimePeriod] = useState('day');
  const isTvBrowser = isSmartTvBrowser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteTrendingQuery(mediaType, timePeriod);

  return (
    <div className={isTvBrowser ? 'mt-4' : 'mt-24'}>
      <div
        className='absolute left-3 z-1'
        style={{ top: isTvBrowser ? '5.75rem' : '5rem' }}
      >
        <BackButton />
      </div>
      <div className='flex flex-col sm:flex-row items-center justify-between mx-3 mb-6'>
        <h2 className='mx-1 px-1 chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mt-4'>
          {heading}
        </h2>
        <div className='pt-2 sm:pt-0 sm:pr-4 md:pr-10'>
          <TrendingToggle
            timePeriod={timePeriod}
            onTimeChange={setTimePeriod}
          />
        </div>
      </div>

      {data && (
        <Explore
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          itemType={mediaType}
        />
      )}
    </div>
  );
};

export default TrendingContainer;
