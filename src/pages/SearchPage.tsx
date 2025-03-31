import { useRef, useEffect, useMemo, memo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteSearchQuery } from '../hooks/useSearchAndDiscover';
import { IItem } from '../interfaces/IItem';
import { MemoizedItemCard } from '../components/cards/ItemCard';
import { useBookmarkStore } from '../state/store';
import useDocumentTitle from '../hooks/usePageTitles';
// Memoized Results component
const Results = memo(() => {
  const { query } = useParams<{ query: string }>();
  useDocumentTitle(`Search results for '${query}' | BingeBox`);
  const lastResultsRef = useRef<IItem[]>([]);
  const { ref, inView } = useInView();
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

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
  const allItems = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <div className='ml-2 mt-8'>
      <div className='flex flex-wrap flex-1 gap-4 items-start'>
        {allItems.length > 0 ? (
          allItems.map((item: IItem) => (
            <MemoizedItemCard
              key={`${item.media_type}-${item.id}`}
              item={item}
              textSize='md'
              isBookmarked={bookmarks.some(
                (a) => a.id === item.id && a.type === item.media_type
              )}
            />
          ))
        ) : (
          <p className='text-lg text-gray-400'>No results found.</p>
        )}
      </div>
      <div ref={ref} className='h-10 mt-4'>
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
    [searchQuery]
  );

  return (
    <div className='mt-36 mx-4'>
      <h1 className='text-3xl font-bold mt-10 mb-8 relative'>{headingText}</h1>

      <Results />
    </div>
  );
});

SearchContainer.displayName = 'SearchContainer';

export default SearchContainer;
