import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Search = ({
  searchOpen,
  closeSearch,
}: {
  searchOpen: boolean;
  closeSearch: () => void;
}) => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/search/${e.target.value}`);
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`fixed top-0 left-0 w-full h-34 bg-transparent transition-all duration-700 flex items-end pb-4 justify-center ${
        searchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}
    >
      <input
        type='text'
        className='w-full h-13 px-4 mx-1 text-xl bg-gray-900 text-white border-2 rounded-md border-gray-700 focus:outline-none focus:rounded-lg focus:ring-1 focus:ring-white'
        placeholder='Search...'
        onChange={handleNavigate}
        autoFocus
      />
      <button
        aria-label='close search'
        className='absolute right-4 pb-3.5 text-white text-2xl hover:text-gray-300 focus:outline-none'
        onClick={closeSearch}
        type='submit'
      >
        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
      </button>
    </form>
  );
};

export default Search;
