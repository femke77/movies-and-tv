import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import NavMovies from './NavComponents/NavMovies';
import NavTVShow from './NavComponents/NavTVShow';
import NavDiscover from './NavComponents/NavDiscover';

export default function Navigation() {
  return (
    <Disclosure as='nav' className='bg-gray-900 h-20 py-2 pr-4'>
      {({ open }) => (
        <>
          <div className='mx-auto px-4 sm:px-4 lg:px-4'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <NavLink
                  to='/'
                  className='flex flex-shrink-0 items-center'
                ></NavLink>
                <div className='hidden sm:flex flex-1 items-center py-6'>
                  <div className='flex space-x-4 items-center'>
                    <NavMovies />
                    <NavTVShow />
                    <NavDiscover />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className='sm:hidden absolute z-40 bg-gray-800 w-full'>
            {/* TODO mobile view */}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
