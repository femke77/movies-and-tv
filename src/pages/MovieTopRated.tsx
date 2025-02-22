import { useInfiniteDiscoverQuery } from "../hooks/useSearchAndDiscover";
import Explore from "../components/ExploreDisplay";

const MovieTopRated = () => {
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteDiscoverQuery("movie", "vote_average.desc", "en", 7);

    return (
        <div className="mt-24">
            <h2 className="text-xl sm:text-2xl md:text-3xl ml-3">Top Rated Movies</h2>
            {data && ( <Explore
                data={data}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isLoading={isLoading}
            />)}
           
        </div>
    )   
}

export default MovieTopRated;