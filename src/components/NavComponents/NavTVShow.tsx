import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import MenuItemLink from './MenuItemLink';

const NavTVShows = () => {
  return (
    <Menu>
      <MenuButton className='hover:cursor-pointer relative inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white focus:outline-white data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        {({ open }) => (
          <>
            TV Shows
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
        className='relative z-50 w-64 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0  bg-gray-900/95'
      >
        {' '}
        <div className='flex justify-start items-center p-4 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#ffffff'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-tv'
          >
            <rect width='20' height='15' x='2' y='7' rx='2' ry='2' />
            <polyline points='17 2 12 7 7 2' />
          </svg>
          <h3 className='text-md font-bold ml-3'>TV Shows</h3>
        </div>
        <MenuItemLink to='/explore/tv' name='Trending Series' />
        <MenuItemLink to='/explore/top-series' name='Top Rated Series' />
        <MenuItemLink to='/explore/popular-tv' name='Popular TV' />
      </MenuItems>
    </Menu>
  );
};

export default NavTVShows;
