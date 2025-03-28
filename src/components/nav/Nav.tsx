import { useState, useEffect, useRef } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import NavMovies from './NavMovies';
import NavTVShow from './NavTVShow';
import NavMe from './NavMe';
// import NavDiscover from './NavComponents/NavDiscover';
import Search from '../HeaderSearchBar';
import { Clapperboard, Tv, CircleUser } from 'lucide-react';

const moviesNav = [
  { title: 'Trending Movies', url: '/explore/movies' },
  { title: 'Top Rated Movies', url: '/explore/toprated' },
  { title: 'Popular Movies', url: '/explore/popular' },
  { title: 'All Movies', url: '/explore/all-movies' },
];

const tvNav = [
  { title: 'Trending TV', url: '/explore/tv' },
  { title: 'Top Rated Series', url: '/explore/top-series' },
  { title: 'Popular TV', url: '/explore/popular-tv' },
  { title: 'All TV', url: '/explore/all-tv' },
];

const meNav = [{ title: 'My Watchlist', url: '/account/saved' }];

export default function Navigation({
  setSearchQuery,
}: {
  setSearchQuery: (_query: string) => void;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div>
      <nav className='bg-gray-900 h-16 relative z-40 '>
        <Disclosure>
          {({ open }) => (
            <>
              <div className='mx-auto mr-4 sm:px-2 lg:px-4  '>
                <div className='relative flex h-16 items-center justify-between '>
                  <div className='absolute inset-y-0 -left-10 flex items-center [@media(min-width:825px)]:hidden'>
                    <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </DisclosureButton>
                  </div>
                  <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                    <div className='[@media(max-width:825px)]:hidden md:flex flex-1 items-center py-6 pl-2'>
                      <div className='flex space-x-3 items-center pr-4 '>
                        <NavMovies />
                        <NavTVShow />
                        <NavMe />
                        {/* <NavDiscover /> */}
                      </div>
                    </div>
                    {open ? (
                      <DisclosureButton
                        role='search'
                        onClick={() => openSearch()}
                        className='relative -right-2 top-0 hover:cursor-pointer  [@media(min-width:825px)]:top-5 h-[50px] w-[50px]  rounded-[50%] active:bg-gray-700 bg-gray-800 hover:bg-gray-700'
                      >
                        <img
                          src='/mag.svg'
                          alt='search'
                          className='w-8 h-8 ml-2'
                        />
                      </DisclosureButton>
                    ) : (
                      <button
                        role='search'
                        onClick={() => openSearch()}
                        className='relative -right-2  [@media(min-width:825px)]:top-5  h-[50px] w-[50px] hover:cursor-pointer rounded-[50%] active:bg-gray-700 bg-gray-800 hover:bg-gray-700'
                      >
                        <img
                          src='/mag.svg'
                          alt='search'
                          className='w-8 h-8 ml-2 '
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Fullscreen Mobile Nav */}
              <DisclosurePanel>
                <div
                  className={`block [@media(min-width:825px)]:hidden fixed inset-0 my-16  bg-black  transition-all duration-700 ${
                    open
                      ? 'opacity-96 h-screen'
                      : 'opacity-0 h-0 pointer-events-none'
                  }`}
                >
                  <div className='flex justify-center flex-wrap mt-6 sm:mt-12 '>
                    <div className='text-white'>
                      <div className='flex justify-start items-center p-4 '>
                        <Clapperboard className='text-white' />
                        <h2 className='ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-300/70 text-transparent bg-clip-text'>
                          Movies
                        </h2>
                      </div>
                      <div className='flex flex-col'>
                        {moviesNav.map((item, index) => (
                          <DisclosureButton
                            className='transition-all duration-200 ease-in-out bg-white/15 w-50 p-2  rounded-lg text-sm text-white/90 text-center cursor-pointer m-2 hover:transform hover:translate-0.5 hover:text-white hover:bg-[#1B1B1B]'
                            as={NavLink}
                            key={index}
                            to={item.url}
                          >
                            {item.title}
                          </DisclosureButton>
                        ))}
                      </div>
                    </div>
                    <div className='text-white'>
                      <div className='flex justify-start items-center p-4 '>
                        <Tv className='text-white' />
                        <h2 className='ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-300/70 text-transparent bg-clip-text'>
                          TV Shows
                        </h2>
                      </div>
                      <div className='flex flex-col'>
                        {tvNav.map((item, index) => (
                          <DisclosureButton
                            className='transition-all duration-200 ease-in-out bg-white/15 w-50 p-2  rounded-lg text-sm text-white/90 text-center cursor-pointer m-2 hover:transform hover:translate-0.5 hover:text-white hover:bg-[#1B1B1B]'
                            as={NavLink}
                            key={index}
                            to={item.url}
                          >
                            {item.title}
                          </DisclosureButton>
                        ))}
                      </div>
                    </div>
                    <div className='text-white'>
                      <div className='flex justify-start items-center p-4 '>
                        <CircleUser className='text-white' />
                        <h2 className='ml-3 text-xl font-bold bg-gradient-to-r from-white to-gray-300/70 text-transparent bg-clip-text'>
                          My BingeBox
                        </h2>
                      </div>
                      <div className='flex flex-col'>
                        {meNav.map((item, index) => (
                          <DisclosureButton
                            className='transition-all duration-200 ease-in-out bg-white/15 w-50 p-2  rounded-lg text-sm text-white/90 text-center cursor-pointer m-2 hover:transform hover:translate-0.5 hover:text-white hover:bg-[#1B1B1B]'
                            as={NavLink}
                            key={index}
                            to={item.url}
                          >
                            {item.title}
                          </DisclosureButton>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </nav>

      {/* Search Bar */}
      {isVisible && (
        <div ref={searchRef}>
          <Search
            searchOpen={searchOpen}
            closeSearch={closeSearch}
            setSearchQuery={setSearchQuery}
          />
        </div>
      )}
    </div>
  );
}
