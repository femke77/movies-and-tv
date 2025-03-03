import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import MenuItemLink from './MenuItemLink';

const NavMovies = () => {
  return (
    <Menu>
      <MenuButton className='hover:cursor-pointer relative inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white  z-50'>
        {({ open }) => (
          <>
            Movies
            {open ? (
              <ChevronUpIcon className='size-4 fill-white/60' />
            ) : (
              <ChevronDownIcon className='size-4 fill-white/60' />
            )}
          </>
        )}
      </MenuButton>

      <MenuItems
        transition
        anchor='bottom end'
        className='w-64 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0  bg-gray-900/95 relative z-50'
      >
        {' '}
        <div className='flex justify-start items-center p-4 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#f8f7f7'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-film'
          >
            <rect width='18' height='18' x='3' y='3' rx='2' />
            <path d='M7 3v18' />
            <path d='M3 7.5h4' />
            <path d='M3 12h18' />
            <path d='M3 16.5h4' />
            <path d='M17 3v18' />
            <path d='M17 7.5h4' />
            <path d='M17 16.5h4' />
          </svg>
          <h3 className='text-md font-bold ml-3'>Movies</h3>
        </div>
        <MenuItemLink to='/explore/movies' name='Trending Movies' />
        <MenuItemLink to='/explore/toprated' name='Top Rated Movies' />
        <MenuItemLink to='/explore/popular' name='Popular Movies' />
      </MenuItems>
    </Menu>
  );
};

export default NavMovies;
