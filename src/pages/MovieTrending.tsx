import { useInfiniteTrendingQuery } from '../hooks/useSearchAndDiscover';
import Explore from '../components/ExploreDisplay';

const MovieTrending = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteTrendingQuery('movie', 'day');


  return (
    <div className='mt-24'>
      <h2 className='text-xl sm:text-2xl md:text-3xl ml-3'>Trending Movies Today</h2>
      {data && (
        <Explore
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MovieTrending;
