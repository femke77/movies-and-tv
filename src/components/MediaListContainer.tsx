import { useState } from 'react';
import { useInfiniteDiscoverQuery } from '../hooks/useSearchAndDiscover';
import GenreSelector from './GenreSelector';
import Explore from './ExploreDisplay';
import { IGenre } from '../interfaces/IGenre';
import SortByListbox from './SortByListbox';

// TODO make sure explore and item card really need to be memoized
interface MediaListContainerProps {
  mediaType: 'movie' | 'tv';
  // listType: "popular" | "top_rated";
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
  sortOptions: {id: number, name: string, value:string}[];
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
      } 
      else {
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
      } 
      else {
        setSelectedGenres((selected) => 
          selected.filter((genre) => genre !== genreId)
        );
        return [...prev, genreId];
      }
    });
  };


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteDiscoverQuery(
      mediaType,
      selectedGenres?.join(','),
      sortByOption,
      '',
      voteAverage,
      voteCount,
      deSelectedGenres.join(',')
    );

  return (
    <div className='mt-24'>
      <div className='mx-3 flex flex-wrap justify-between w-full'>
        <h2 className='text-[1.75rem] font-semibold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text   mb-6 mr-4'>{heading}</h2>
       <SortByListbox
          sortByOption={sortByOption}
          setSortByOption={setSortByOption}
          sortOptions={sortOptions}
        />
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
