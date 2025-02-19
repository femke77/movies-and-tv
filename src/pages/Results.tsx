import  { useRef, useEffect, useMemo, memo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useSearchQuery } from '../hooks/useSearchAndDiscover';
import { IItem } from '../interfaces/IItem';
import ItemCard from '../components/ItemCard';

// Memoized ItemCard wrapper
const MemoizedItemCard = memo(({ movie }: { movie: IItem }) => (
  <div
    className="w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]"
  >
    <ItemCard
      textSize="xl"
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
  const { data = [], isLoading } = useSearchQuery(query ?? '', '1');
  const lastResultsRef = useRef<IItem[]>([]);

  useEffect(() => {
    if (query?.length === 1) {
      lastResultsRef.current = data;
    }
  }, [query, data]);

  // Memoize filtered results
  const results = useMemo(() => {
    const filteredData = query
      ? data.filter(
          (item: IItem) =>
            (item.title || item.poster_path) || (item.name || item.poster_path)
        )
      : lastResultsRef.current;
    return filteredData;
  }, [query, data]);

  if (isLoading) return null;

  return (
    <div className="ml-2 mt-8">
      <div className="flex flex-wrap flex-1 gap-4 items-start">
        {results.length > 0 ? (
          results.map((movie: IItem) => (
            <MemoizedItemCard key={`movie-${movie.id}`} movie={movie} />
          ))
        ) : (
          <p className="text-lg text-gray-400">No results found.</p>
        )}
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
  const headingText = useMemo(() => 
    `Search results for '${searchQuery || lastLetterRef.current}'`,
    [searchQuery]
  );

  return (
    <div className="mt-36 mx-4">
      <h2 className="text-3xl font-bold mt-10 mb-8 relative">
        <span>{headingText}</span>
        <div className="inline">
          <Results />
        </div>
      </h2>
    </div>
  );
});

SearchContainer.displayName = 'SearchContainer';

export default SearchContainer;