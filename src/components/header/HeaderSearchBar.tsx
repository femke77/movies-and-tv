import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import clsx from 'clsx';
import { useStore } from '../../state/store';
const Search = ({
  searchOpen,
  closeSearch,
}: {
  searchOpen: boolean;
  closeSearch: () => void;
}) => {
  const { addToPreviousSearches } = useStore();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleClear = () => {
    if (inputRef?.current) inputRef.current.value = '';
  };
  const hasNavigated = useRef(false);

  const handleNavigate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value) {
      debounceRef.current = setTimeout(() => {
        if (!hasNavigated.current) {
          navigate(`/search/${value}`);
          hasNavigated.current = true;
        } else {
          navigate(`/search/${value}`, { replace: true });
        }
      }, 175);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = inputRef.current?.value.trim();
        if (value) {
          addToPreviousSearches(value);
        }
      }}
      role='search'
      className={clsx(
        `fixed top-0 left-0 w-full h-34 bg-transparent transition-all duration-700 flex items-end pb-4 justify-center z-50 ${
          searchOpen
            ? 'opacity-100 translate-y-0 pointer-events-none'
            : 'opacity-0 -translate-y-full '
        }`,
      )}
    >
      <input
        ref={inputRef}
        type='text'
        className='pointer-events-auto w-full h-13 px-4 mx-1 text-xl bg-gray-900/90 text-white border-2 rounded-md border-gray-700 focus:outline-none focus:rounded-lg focus:ring-1 focus:ring-white'
        placeholder='Search for movies or tv shows...'
        onChange={handleNavigate}
        autoFocus
      />
      <div className='pointer-events-auto absolute flex justify-end items-end pb-3.5 right-6'>
        {inputRef?.current?.value && (
          <button
            type='reset'
            onClick={handleClear}
            className='pr-8 text-center pl-6 hover:text-gray-300 focus:outline-white hover:cursor-pointer'
          >
            Clear
          </button>
        )}

        <button
          aria-label='close search'
          className='pointer-events-auto text-white text-2xl  hover:text-gray-300 focus:outline-white hover:cursor-pointer'
          onClick={closeSearch}
        >
          <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
        </button>
      </div>
    </form>
  );
};

export default Search;
