import { useEffect, memo } from "react";
import { useInView } from "react-intersection-observer";
import { IItem } from "../interfaces/IItem";
import { MemoizedItemCard } from "./ItemCard";

interface IExploreProps {
  data: {
    pages: { results: IItem[] }[];
  };
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  itemType?: string;
}

const Explore = memo(
  ({
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    itemType="movie",
  }: IExploreProps) => {
    const { ref, inView } = useInView();

    useEffect(() => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isLoading) return null;
    const allItems = data?.pages.flatMap((page) => page.results) ?? [];
    return (
      <div className="ml-2 mt-8">
        <div className="flex flex-wrap flex-1 gap-4 items-start">
          {allItems.length > 0 ? (
            allItems.map((movie: IItem) => (
              <MemoizedItemCard itemType={itemType} key={`movie-${movie.id}`} movie={movie} showGenres={true} showRating={true }/>
            ))
          ) : (
            <p className="text-lg text-gray-400">No results found.</p>
          )}
        </div>
        <div ref={ref} className="h-10 mt-4">
          {isFetchingNextPage && <div>Getting more results...</div>}
        </div>
      </div>
    );
  }
);

Explore.displayName = "Explore";
export default Explore;