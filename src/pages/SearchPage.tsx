import { useRef, useEffect, useMemo, memo, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteSearchQuery } from '../hooks/useSearchAndDiscover';
import { IItem } from '../interfaces/IItem';
import { MemoizedItemCard } from '../components/cards/ItemCard';
import { useBookmarkStore } from '../state/store';
import useDocumentTitle from '../hooks/usePageTitles';
import BackButton from '../components/buttons/BackBtn';
import { CastCard } from '../components/cards/CastCard';
import { ICast } from '../interfaces/ICast';

const Results = memo(() => {
  const { query } = useParams<{ query: string }>();
  useDocumentTitle(`Search results for '${query}' | BingeBox`);
  const lastResultsRef = useRef<IItem[]>([]);
  const [personOnly, setPersonOnly] = useState(false);
  const { ref, inView } = useInView();
  const bookmarks = useBookmarkStore((state) => state.bookmarks);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSearchQuery(query ?? '');

  const handlePersonOnly = () => {
    setPersonOnly((prev) => !prev);
  };
  console.log('data', data);

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
  const allPersons = data?.pages.flatMap((page) => page.persons) ?? [];
  
  return (
    <div className='ml-2 mt-8'>
      <button
        className='absolute top-20 right-6 z-1 bg-gray-700 h-9 w-30 rounded-lg hover:bg-gray-800 hover:translate-[1px] active:translate-[1px] mr-6'
        onClick={handlePersonOnly}
      >
        Person Only
      </button>
      <div className='absolute top-20 left-3 z-1'>
        <BackButton />
      </div>

      {personOnly ? (
        <>
        <div className='flex flex-wrap flex-1 gap-4 items-start'>
        {allPersons.length > 0 ? (
          allPersons.map((item: ICast) => (
            <CastCard
              key={`person-${item.id}`}
              cast={item}
             
            />
          ))
        ) : (
          <p className='text-lg text-gray-400'>No results found.</p>
        )}
      </div>
      <div ref={ref} className='h-30 mt-4'>
        {isFetchingNextPage && (
          <div className='flex justify-center my-10'>
            <div className='loader'></div>
          </div>
        )}
      </div>

        </>
      ) : (
        <>
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
          <div ref={ref} className='h-30 mt-4'>
            {isFetchingNextPage && (
              <div className='flex justify-center my-10'>
                <div className='loader'></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

Results.displayName = 'Results';

// container component
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
