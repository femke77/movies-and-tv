import { useState } from "react";
import { useInfiniteDiscoverQuery } from "../../hooks/useSearchAndDiscover";
import GenreSelector from "../GenreSelector";
import Explore from "../ExploreDisplay";
import { IGenre } from "../../interfaces/IGenre";
import SortByListbox from "../ListBox";

// TODO make sure explore and item card really need to be memoized
interface MediaListContainerProps {
  mediaType: "movie" | "tv";
  // listType: "popular" | "top_rated";
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
  sortOptions: { id: number; name: string; value: string }[];
  voteCount?: number;
}

const MediaListContainer = ({
  mediaType,
  // listType,
  sortBy,
  heading,
  genres,
  voteAverage,
  sortOptions,
  voteCount,
}: MediaListContainerProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [deSelectedGenres, setDeSelectedGenres] = useState<string[]>([]);
  const [sortByOption, setSortByOption] = useState<string>(sortBy!);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((genre) => genre !== genreId);
      } else {
        setDeSelectedGenres((deselected) =>
          deselected.filter((genre) => genre !== genreId)
        );
        return [...prev, genreId];
      }
    });
  };

  const toggleUnwantedGenre = (genreId: string) => {
    setDeSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((genre) => genre !== genreId);
      } else {
        setSelectedGenres((selected) =>
          selected.filter((genre) => genre !== genreId)
        );
        return [...prev, genreId];
      }
    });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteDiscoverQuery(
    mediaType,
    selectedGenres?.join(","),
    sortByOption,
    "",
    voteAverage,
    voteCount,
    deSelectedGenres.join(",")
  );

  return (
    <div className="mt-24">
      <div className="mx-3 flex flex-wrap justify-between align-center w-full">
        <h2 className="chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-2  lg:mb-6 mr-2">
          {heading}
        </h2>
        <div className="mr-[50px] h-[50px] mb-6 lg:mb-0 pt-1 md:pt-4">
          <SortByListbox
            selectedOption={sortByOption}
            setSelectedOption={setSortByOption}
            availableOptions={sortOptions}
          />
        </div>
      </div>
      <GenreSelector
        genres={genres}
        onGenreToggle={toggleGenre}
        selectedGenres={selectedGenres}
        deselectedGenres={deSelectedGenres}
        onUnwantedGenreToggle={toggleUnwantedGenre}
      />

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
