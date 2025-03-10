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
        <h2 className='chrome text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text'>
          {heading}
        </h2>
        <div className='pr-10'>
          <TrendingToggle onTimeChange={setTimePeriod} />
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
