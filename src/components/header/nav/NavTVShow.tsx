import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import MenuItemLink from './MenuItemLink';
import clsx from 'clsx';

const NavTVShows = ({ isTvBrowser = false }: { isTvBrowser?: boolean }) => {
  return (
    <Menu>
      <MenuButton className='hover:cursor-pointer relative inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-md/6 font-semibold text-white focus:outline-white data-[hover]:bg-gray-700  data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        {({ open }) => (
          <>
            <h2
              className={clsx(
                'text-lg font-bold',
                isTvBrowser
                  ? 'text-white'
                  : 'bg-gradient-to-r from-white to-gray-300/70 text-transparent bg-clip-text',
              )}
            >
              TV Shows
            </h2>

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
        modal={false}
        className={clsx(
          'relative z-50 w-64 origin-top-right rounded-xl p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0',
          isTvBrowser
            ? 'bg-[#111827] border border-white/15 shadow-2xl'
            : 'bg-gray-900/95 border border-white/5',
        )}
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
          <h3 className='text-md font-bold ml-3'>Explore New TV Shows</h3>
        </div>
        <MenuItemLink
          to='/explore/tv'
          name='Trending Series'
          isTvBrowser={isTvBrowser}
        />
        <MenuItemLink
          to='/explore/top-series'
          name='Top Rated Series'
          isTvBrowser={isTvBrowser}
        />
        <MenuItemLink
          to='/explore/popular-tv'
          name='Popular TV'
          isTvBrowser={isTvBrowser}
        />
        <MenuItemLink
          to='/explore/all-tv'
          name='Explore All TV Shows'
          isTvBrowser={isTvBrowser}
        />
        <MenuItemLink
          to='/explore/upcoming-tv'
          name='Upcoming New TV'
          isTvBrowser={isTvBrowser}
        />
      </MenuItems>
    </Menu>
  );
};

export default NavTVShows;
