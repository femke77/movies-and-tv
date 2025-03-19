import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import MenuItemLink from './MenuItemLink';
import { CircleUser } from 'lucide-react';

const NavMe = () => {
  return (
    <Menu>
      <MenuButton
        tabIndex={0}
        className='hover:cursor-pointer relative inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-md/6 font-semibold text-white focus:outline-white data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white  z-50'
      >
        {({ open }) => (
          <>
            <h2 className='text-lg font-bold bg-gradient-to-r from-white to-gray-300/70 text-transparent bg-clip-text'>
              My BingeBox
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
        className='w-64 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:12px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0  bg-gray-900/95 relative z-50'
      >
        {' '}
        <div className='flex justify-start items-center p-4 '>
        <CircleUser className='text-white' />
          <h3 className='text-md font-bold ml-3'>Account</h3>
        </div>
        <MenuItemLink to='/account/bookmarks' name='Saved Movies' />
        
      </MenuItems>
    </Menu>
  );
};

export default NavMe;
