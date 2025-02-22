import { useRef, useEffect, useMemo, memo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteSearchQuery } from '../hooks/useSearchAndDiscover';
import { IItem } from '../interfaces/IItem';
import ItemCard from '../components/ItemCard';

// Memoized ItemCard wrapper
const MemoizedItemCard = memo(({ movie }: { movie: IItem }) => (
  <div className='w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]'>
    <ItemCard
      textSize='xl'
      item={movie}
      showRating={false}
      showGenres={false}
      itemType={movie.media_type || ''}
    />
  </div>
));

MemoizedItemCard.displayName = 'MemoizedItemCard';

// Memoized Results component
const Results = memo(() => {
  const { query } = useParams<{ query: string }>();
  const lastResultsRef = useRef<IItem[]>([]);
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSearchQuery(query ?? '');

  
 useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  

  useEffect(() => {
    if (query?.length === 1) {
      lastResultsRef.current = data?.pages[0].results ?? [];
    }
  }, [query, data]);


  if (isLoading) return null;
  const allMovies = data?.pages.flatMap(page => page.results) ?? [];
  return (
    <div className="ml-2 mt-8">
      <div className="flex flex-wrap flex-1 gap-4 items-start">
        {allMovies.length > 0 ? (
          allMovies.map((movie: IItem) => (
            <MemoizedItemCard key={`movie-${movie.id}`} movie={movie} />
          ))
        ) : (
          <p className='text-lg text-gray-400'>No results found.</p>
        )}
      </div>
      <div ref={ref} className="h-10 mt-4">
        {isFetchingNextPage && <div>Getting more results...</div>}
      </div>
    </div>
  );
});

Results.displayName = 'Results';

// Main container component
const SearchContainer = memo(() => {
  const searchQuery = useOutletContext<string>();
  const lastLetterRef = useRef<string | null>(null);

  useEffect(() => {
    if (searchQuery.length === 1) {
      lastLetterRef.current = searchQuery;
    }
  }, [searchQuery]);

  // Memoize the heading text
  const headingText = useMemo(
    () => `Search results for '${searchQuery || lastLetterRef.current}'`,
    [searchQuery],
  );

  return (
    <div className='mt-36 mx-4'>
      <h2 className='text-3xl font-bold mt-10 mb-8 relative'>
        <span>{headingText}</span>
        <div className='inline'>
          <Results />
        </div>
      </h2>
    </div>
  );
});

SearchContainer.displayName = 'SearchContainer';

export default SearchContainer;
