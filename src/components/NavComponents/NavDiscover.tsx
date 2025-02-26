import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';

const NavDiscover = () => {
  return (
    <Menu>
      <MenuButton className='hover:cursor-pointer inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white'>
        {({ open }) => (
          <>
            Discover
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
        className=' w-52 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 bg-gray-900/95'
      >
        <MenuItem>
          <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
            Trending Today
          </button>
        </MenuItem>
        <MenuItem>
          <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
            Most Popular
          </button>
        </MenuItem>
        <MenuItem>
          <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
            Award Winners
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavDiscover;
