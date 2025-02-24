import { useState } from "react";
import { useInfiniteDiscoverQuery } from "../hooks/useSearchAndDiscover";
import GenreSelector from "./GenreSelector";
import Explore from "./ExploreDisplay";
import { IGenre } from "../interfaces/IGenre";

interface MediaListContainerProps {
  mediaType: "movie" | "tv";
  // listType: "popular" | "top_rated";
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
}

const MediaListContainer = ({
  mediaType,
  // listType,
  sortBy,
  heading,
  genres,
  voteAverage,
}: MediaListContainerProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((genre) => genre !== genreId) : [...prev, genreId]
    );
  };


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDiscoverQuery(mediaType, selectedGenres?.join(","), sortBy, '', voteAverage);

  return (
    <div className="mt-24">
      <div className="mx-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl mb-6">{heading}</h2>
        <GenreSelector genres={genres} onGenreToggle={toggleGenre} selectedGenres={selectedGenres}/>
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
