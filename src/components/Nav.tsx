import { useState } from 'react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openSearch = () => {
    setIsVisible(true);
    setTimeout(() => setSearchOpen(true), 10); 
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setTimeout(() => setIsVisible(false), 0); 
  };

  return (
    <nav className='bg-gray-900 h-16 relative z-50'>
      <Disclosure>
        {({ open }) => (
          <>
            <div className='mx-auto px-4 sm:px-4 lg:px-4'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 -left-5 flex items-center md:hidden'>
                  <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </DisclosureButton>
                </div>
                <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                  <NavLink
                    to='/'
                    className='flex flex-shrink-0 items-center'
                  ></NavLink>
                  <div className='hidden md:flex flex-1 items-center py-6'>
                    <div className='flex space-x-4 items-center'>
                      <NavMovies />
                      <NavTVShow />
                      <NavDiscover />
                      <button
                        role='search'
                        aria-label='search'
                        onClick={() => openSearch()}
                      >
                        <img
                          src='/mag.svg'
                          alt='search'
                          className='w-8 h-8'
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DisclosurePanel className='md:hidden absolute z-40 bg-gray-800 w-full'>
              {/* TODO mobile view */}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Search Bar */}
      {isVisible && (
        <div
          className={`fixed top-0 left-0 w-full h-32 bg-transparent bg-opacity-90 transition-all duration-700 flex items-end pb-4 justify-center ${
            searchOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        >
          <input
            type='text'
            className='w-full h-10 px-4 mx-1 text-xl bg-gray-900 text-white border-2 rounded-md border-gray-700 focus:outline-none focus:rounded-lg focus:ring-1 focus:ring-white'
            placeholder='Search...'
         
          />
          <button
            className='absolute right-4 pb-2 text-white text-2xl'
            onClick={closeSearch}
          >
            ✕
          </button>
        </div>
      )}
    </nav>
  );
}
