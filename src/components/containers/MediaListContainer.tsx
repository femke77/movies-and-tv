import { useEffect, useState, useRef } from 'react';
import { useInfiniteDiscoverQuery } from '../../hooks/useSearchAndDiscover';
import GenreSelector from '../selectors/GenreSelector';
import Explore from './ExploreDisplay';
import { IGenre } from '../../interfaces/IGenre';
import Listbox from '../selectors/ListBox';
import { useLocation } from 'react-router-dom';
import BackButton from '../buttons/BackBtn';
import providers from '../../utils/data/providers.json';


interface MediaListContainerProps {
  mediaType: 'movie' | 'tv';
  heading: string;
  genres: IGenre[];
  sortBy?: string;
  voteAverage?: number;
  sortOptions: { id: number; name: string; value: string }[];
  voteCount?: number;
  genre?: string;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  watchProvider?: string;
  with_companies?: string;
  with_networks?: string;
  showRating?: boolean;
}

const MediaListContainer = ({
  mediaType,
  sortBy,
  heading,
  genres,
  voteAverage,
  sortOptions,
  voteCount,
  genre,
  primary_release_date_gte,
  primary_release_date_lte,
  first_air_date_gte,
  first_air_date_lte,
  watchProvider,
  with_companies,
  with_networks,
  showRating = true,
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
    // reset the page's default sortBy if the path has changed
    if (location.pathname !== sessionStorage.getItem('lastPath')) {
      sessionStorage.setItem(`${mediaType}-sortBy`, sortBy || '');
      return sortBy || '';
    }
    // if the path is the same, use the saved sortBy from most recent selection
    const stored = sessionStorage.getItem(`${mediaType}-sortBy`);
    return stored || sortBy || '';
  });

  const [watchProviderOption, setWatchProviderOption] = useState<string>(() => {
    return watchProvider || '';
  });


  useEffect(() => {
    if (isInitialMount.current) {
      sessionStorage.setItem('lastPath', location.pathname);
      isInitialMount.current = false;
      if (genre) {
        setSelectedGenres([genre]);
      }
     
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
  }, [
    genre,
    selectedGenres,
    deSelectedGenres,
    sortByOption,
    mediaType,
    watchProviderOption,
    location.pathname,
  ]);

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
      '', //lang is english only
      voteAverage,
      voteCount,
      deSelectedGenres.join(','),
      with_companies,
      with_networks,
      watchProviderOption,
      primary_release_date_gte,
      primary_release_date_lte,
      first_air_date_gte,
      first_air_date_lte,
    );

  return (
    <div className='mt-24'>
      <div className='absolute top-20 left-3 z-1'>
        <BackButton />
      </div>
      <div className='mx-3 flex flex-wrap justify-between items-start w-full'>
        <h2 className='chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-2 mt-4 lg:mb-6 mr-4'>
          {heading}
        </h2>
        <div
          className={`mr-[50px] h-[50px] w-[300px] mt-0 mb-14 lg:mb-0 pt-2 `}
        >
          <Listbox
            selectedOption={sortByOption}
            setSelectedOption={setSortByOption}
            availableOptions={sortOptions}
          />
          <div className='mt-3'>
            <Listbox
              selectedOption={watchProviderOption}
              setSelectedOption={setWatchProviderOption}
              availableOptions={providers}
            />
          </div>
        </div>
      </div>
      <div>
        <GenreSelector
          genres={genres}
          onGenreToggle={toggleGenre}
          selectedGenres={selectedGenres}
          deselectedGenres={deSelectedGenres}
          onUnwantedGenreToggle={toggleUnwantedGenre}
        />
      </div>
      {data && (
        <Explore
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          itemType={mediaType}
          showRating={showRating}
        />
      )}
    </div>
  );
};

export default MediaListContainer;
