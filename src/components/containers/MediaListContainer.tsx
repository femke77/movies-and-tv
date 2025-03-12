import { useEffect, useState } from 'react';
import { useInfiniteDiscoverQuery } from '../../hooks/useSearchAndDiscover';
import GenreSelector from '../GenreSelector';
import Explore from '../ExploreDisplay';
import { IGenre } from '../../interfaces/IGenre';
import SortByListbox from '../ListBox';
import { useSearchParams } from 'react-router-dom';

interface MediaListContainerProps {
  mediaType: 'movie' | 'tv';
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
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genresParam = searchParams.get('genres');
    return genresParam ? genresParam.split(',') : [];
  });

  const [deSelectedGenres, setDeSelectedGenres] = useState<string[]>(() => {
    const deselectedParam = searchParams.get('deselected');
    return deselectedParam ? deselectedParam.split(',') : [];
  });

  const [sortByOption, setSortByOption] = useState<string>(() => {
    return searchParams.get('sortBy') || sortBy || '';
  });

  // Update URL params when state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.join(','));
    } else {
      params.delete('genres');
    }

    if (deSelectedGenres.length > 0) {
      params.set('deselected', deSelectedGenres.join(','));
    } else {
      params.delete('deselected');
    }

    if (sortByOption && sortByOption !== sortBy) {
      params.set('sortBy', sortByOption);
    } else {
      params.delete('sortBy');
    }

    setSearchParams(params);
  }, [
    selectedGenres,
    deSelectedGenres,
    sortByOption,
    setSearchParams,
    searchParams,
    sortBy,
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
      '',
      voteAverage,
      voteCount,
      deSelectedGenres.join(','),
    );

  return (
    <div className='mt-24'>
      <div className='mx-3 flex flex-wrap justify-between align-center w-full'>
        <h2 className='chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-2 lg:mb-6 mr-2'>
          {heading}
        </h2>
        <div className='mr-[50px] h-[50px] mb-6 lg:mb-0 pt-1 md:pt-4'>
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

// import { useState } from 'react';
// import { useInfiniteDiscoverQuery } from '../../hooks/useSearchAndDiscover';
// import GenreSelector from '../GenreSelector';
// import Explore from '../ExploreDisplay';
// import { IGenre } from '../../interfaces/IGenre';
// import SortByListbox from '../ListBox';

// interface MediaListContainerProps {
//   mediaType: 'movie' | 'tv';
//   // listType: "popular" | "top_rated";
//   heading: string;
//   genres: IGenre[];
//   sortBy?: string;
//   voteAverage?: number;
//   sortOptions: { id: number; name: string; value: string }[];
//   voteCount?: number;
// }

// const MediaListContainer = ({
//   mediaType,
//   // listType,
//   sortBy,
//   heading,
//   genres,
//   voteAverage,
//   sortOptions,
//   voteCount,
// }: MediaListContainerProps) => {
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

//   const [deSelectedGenres, setDeSelectedGenres] = useState<string[]>([]);
//   const [sortByOption, setSortByOption] = useState<string>(sortBy!);

//   const toggleGenre = (genreId: string) => {
//     setSelectedGenres((prev) => {
//       if (prev.includes(genreId)) {
//         return prev.filter((genre) => genre !== genreId);
//       } else {
//         setDeSelectedGenres((deselected) =>
//           deselected.filter((genre) => genre !== genreId),
//       );

//       return [...prev, genreId];
//     }
//   });

// };

// const toggleUnwantedGenre = (genreId: string) => {
//   setDeSelectedGenres((prev) => {
//     if (prev.includes(genreId)) {
//       return prev.filter((genre) => genre !== genreId);
//     } else {
//         setSelectedGenres((selected) =>
//           selected.filter((genre) => genre !== genreId),
//         );
//         return [...prev, genreId];
//       }
//     });
//   };

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
//     useInfiniteDiscoverQuery(
//       mediaType,
//       selectedGenres?.join(','),
//       sortByOption,
//       '',
//       voteAverage,
//       voteCount,
//       deSelectedGenres.join(','),
//     );

//   return (
//     <div className='mt-24'>
//       <div className='mx-3 flex flex-wrap justify-between align-center w-full'>
//         <h2 className='chrome text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text mb-2  lg:mb-6 mr-2'>
//           {heading}
//         </h2>
//         <div className='mr-[50px] h-[50px] mb-6 lg:mb-0 pt-1 md:pt-4'>
//           <SortByListbox
//             selectedOption={sortByOption}
//             setSelectedOption={setSortByOption}
//             availableOptions={sortOptions}
//           />
//         </div>
//       </div>
//       <GenreSelector
//         genres={genres}
//         onGenreToggle={toggleGenre}
//         selectedGenres={selectedGenres}
//         deselectedGenres={deSelectedGenres}
//         onUnwantedGenreToggle={toggleUnwantedGenre}
//       />

//       {data && (
//         <Explore
//           data={data}
//           fetchNextPage={fetchNextPage}
//           hasNextPage={hasNextPage}
//           isFetchingNextPage={isFetchingNextPage}
//           isLoading={isLoading}
//           itemType={mediaType}
//         />
//       )}
//     </div>
//   );
// };

// export default MediaListContainer;
