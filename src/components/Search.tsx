import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Search = ({
  searchOpen,
  closeSearch,
  setSearchQuery,
}: {
  searchOpen: boolean;
  closeSearch: () => void;

  setSearchQuery: (_query: string) => void;
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavigate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (value) {
      setSearchQuery(value);
      debounceRef.current = setTimeout(() => {
        navigate(`/search/${value}`, { replace: true });
      }, 150);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`fixed top-0 left-0 w-full h-34 bg-transparent transition-all duration-700 flex items-end pb-4 justify-center z-50 ${
        searchOpen
          ? 'opacity-100 translate-y-0 pointer-events-none'
          : 'opacity-0 -translate-y-full '
      }`}
    >
      <input
        ref={inputRef}
        type='text'
        className='pointer-events-auto w-full h-13 px-4 mx-1 text-xl bg-gray-900 text-white border-2 rounded-md border-gray-700 focus:outline-none focus:rounded-lg focus:ring-1 focus:ring-white'
        placeholder='Search for movies or tv...'
        onChange={handleNavigate}
        autoFocus
      />
      <button
        aria-label='close search'
        className='pointer-events-auto absolute right-4 pb-3.5 text-white text-2xl hover:text-gray-300 focus:outline-none hover:cursor-pointer'
        onClick={closeSearch}
        type='submit'
      >
        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
      </button>
    </form>
  );
};

export default Search;
