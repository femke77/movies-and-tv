import { useState } from "react";
import { useInfiniteDiscoverQuery } from "../hooks/useSearchAndDiscover";
import GenreSelector from "./GenreSelector";
import Explore from "./ExploreDisplay";
import { IGenre } from "../interfaces/IGenre";

interface MediaListContainerProps {
  mediaType: "movie" | "tv";
  listType: "popular" | "top_rated";
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
}

const MediaListContainer = ({
  mediaType,
  listType,
  sortBy,
  heading,
  genres,
  voteAverage,
}: MediaListContainerProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  console.log(selectedGenres);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDiscoverQuery(mediaType, selectedGenres?.join(","), sortBy);

  return (
    <div className="mt-24">
      <div className="mx-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-6">{heading}</h2>
        <GenreSelector genres={genres} onGenreToggle={toggleGenre} />
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

export default MediaListContainer;
