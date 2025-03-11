import CarouselContainer from "../containers/CarouselContainer";
import { useTrendingMovies } from "../../hooks/useTrending";
import { Link } from "react-router-dom";
import ItemCardSkeleton from "../loadingSkeletons/ItemCardSkeleton";

const TrendingMovies = () => {
  const { data: movies = [], isLoading } = useTrendingMovies();

  return (
    <div className="min-h-[350px]" id="trending-section">
      <Link to="/explore/movies">
        <h2 className="text-2xl font-bold mb-6 ml-5 ">
          Today's Trending Movies
        </h2>
      </Link>

      {isLoading && movies.length === 0 ? (
        <div className="flex gap-3 w-[180px] flex-shrink-0 not-[]:overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CarouselContainer items={movies || []} itemType="movie" />
      )}
    </div>
  );
};

export default TrendingMovies;
