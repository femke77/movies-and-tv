import { useEffect, useState, useRef } from 'react';
import { useInfiniteDiscoverQuery } from '../../hooks/useSearchAndDiscover';
import GenreSelector from '../GenreSelector';
import Explore from '../ExploreDisplay';
import { IGenre } from '../../interfaces/IGenre';
import SortByListbox from '../ListBox';
import { useLocation } from 'react-router-dom';

interface MediaListContainerProps {
  mediaType: 'movie' | 'tv';
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
  sortOptions: { id: number; name: string; value: string }[];
  voteCount?: number;
}

const MediaListContainer = ({
  mediaType,
  sortBy,
  heading,
  genres,
  voteAverage,
  sortOptions,
  voteCount,
}: MediaListContainerProps) => {
  const isInitialMount = useRef(true);

  const location = useLocation();

  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const stored = sessionStorage.getItem(`${mediaType}-selectedGenres`);
    return stored ? JSON.parse(stored) : [];
  });

  const [deSelectedGenres, setDeSelectedGenres] = useState<string[]>(() => {
    const stored = sessionStorage.getItem(`${mediaType}-deSelectedGenres`);
    return stored ? JSON.parse(stored) : [];
  });

  const [sortByOption, setSortByOption] = useState<string>(() => {
    if (location.pathname !== sessionStorage.getItem('lastPath')) {
      return sortBy || '';
    }
    const stored = sessionStorage.getItem(`${mediaType}-sortBy`);
    return stored || sortBy || '';
  });

  useEffect(() => {
    
    if (isInitialMount.current) {
      sessionStorage.setItem('lastPath', location.pathname);
      isInitialMount.current = false;
      return;
    }

    sessionStorage.setItem(
      `${mediaType}-selectedGenres`,
      JSON.stringify(selectedGenres),
    );
    sessionStorage.setItem(
      `${mediaType}-deSelectedGenres`,
      JSON.stringify(deSelectedGenres),
    );
    sessionStorage.setItem(`${mediaType}-sortBy`, sortByOption);
  }, [selectedGenres, deSelectedGenres, sortByOption, mediaType]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((genre) => genre !== genreId);
      } else {
        setDeSelectedGenres((deselected) =>
          deselected.filter((genre) => genre !== genreId),
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
          selected.filter((genre) => genre !== genreId),
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
      deSelectedGenres.join(','),
    );

  return (
    <div className='mt-24'>
      <div className='mx-3 flex flex-wrap justify-between items-start w-full'>
        <h2 className='chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-2 lg:mb-6 mr-4'>
          {heading}
        </h2>
        <div className={`mr-[50px] h-[50px] w-[300px] mb-6 lg:mb-0 pt-2 `}>
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
