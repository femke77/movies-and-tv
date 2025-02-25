import { useState } from 'react';
import TrendingToggle from './TrendingToggle';
import Explore from './ExploreDisplay';
import { useInfiniteTrendingQuery } from '../hooks/useSearchAndDiscover';

const TrendingContainer = ({
  mediaType,
  heading,
}: {
  mediaType: string;
  heading: string;
}) => {
  const [timePeriod, setTimePeriod] = useState('week');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteTrendingQuery(mediaType, timePeriod);

  return (
    <div className='mt-24'>
      <div className='flex items-center justify-between mx-3 mb-6'>
        <h2 className='text-[1.75rem] font-semibold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text'>{heading}</h2>
        <TrendingToggle onTimeChange={setTimePeriod} />
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
