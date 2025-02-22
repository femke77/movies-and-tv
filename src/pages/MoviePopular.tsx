import { useInfiniteDiscoverQuery } from '../hooks/useSearchAndDiscover';
import Explore from '../components/ExploreDisplay';

const MoviePopular = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteDiscoverQuery('movie', 'popularity.desc', 'en');

  return (
    <div className='mt-24'>
      <h2 className='text-xl sm:text-2xl md:text-3xl ml-3'>Popular Movies</h2>
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

export default MoviePopular;