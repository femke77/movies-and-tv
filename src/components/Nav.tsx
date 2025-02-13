import { useState, useEffect, useRef } from 'react';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import NavMovies from './NavComponents/NavMovies';
import NavTVShow from './NavComponents/NavTVShow';
import NavDiscover from './NavComponents/NavDiscover';

export default function Navigation() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  console.log(searchQuery);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const openSearch = () => {
    setIsVisible(true);
    setTimeout(() => setSearchOpen(true), 10);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setTimeout(() => setIsVisible(false), 0);
  };

  useEffect(() => {
    if (!searchOpen) return;

    const handleScroll = () => {
      closeSearch();
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <nav className='bg-gray-900 h-16 relative z-50'>
      <Disclosure>
        {({ open }) => (
          <>
            <div className='mx-auto px-4 sm:px-2 lg:px-4'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 -left-10 flex items-center md:hidden'>
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
                  <div className='hidden md:flex flex-1 items-center py-6 pl-2'>
                    <div className='flex space-x-4 items-center pr-4'>
                      <NavMovies />
                      <NavTVShow />
                      <NavDiscover />
                    </div>
                  </div>
                  <button
                    role='search'
                    aria-label='search'
                    onClick={() => openSearch()}
                    className='relative -right-2 top-0 z-50'
                  >
                    <img src='/mag.svg' alt='search' className='w-8 h-8' />
                  </button>
                </div>
              </div>
            </div>

            {/* Fullscreen Mobile Nav */}
            <div
              ref={searchRef}
              className={`fixed inset-0 mt-16 bg-black bg-opacity-80 flex items-center justify-center transition-all duration-700 ${
                open
                  ? 'opacity-90 h-screen'
                  : 'opacity-0 h-0 pointer-events-none'
              }`}
            ></div>
            {/* TODO Mobile view needs links here*/}
          </>
        )}
      </Disclosure>

      {/* Search Bar */}
      {isVisible && (
        <div
          className={`fixed top-0 left-0 w-full h-30 bg-transparent transition-all duration-700 flex items-end pb-4 justify-center ${
            searchOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-full'
          }`}
        >
          <input
            type='text'
            className='w-full h-10 px-4 mx-1 text-xl bg-gray-900 text-white border-2 rounded-md border-gray-700 focus:outline-none focus:rounded-lg focus:ring-1 focus:ring-white'
            placeholder='Search...'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            aria-label='close search'
            className='absolute right-4 pb-2 text-white text-2xl hover:text-gray-300 focus:outline-none'
            onClick={closeSearch}
          >
            <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
          </button>
        </div>
      )}
    </nav>
  );
}
