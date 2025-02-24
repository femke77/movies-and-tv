import { useState, useEffect, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import NavMovies from "./NavComponents/NavMovies";
import NavTVShow from "./NavComponents/NavTVShow";
// import NavDiscover from './NavComponents/NavDiscover';
import Search from "./HeaderSearchBar";

const moviesNav = [
  { title: "Trending", url: "/explore/movies" },
  { title: "Top Rated", url: "/explore/toprated" },
  { title: "Popular", url: "/explore/popular" },
];

const tvNav = [
  { title: "Trending", url: "/explore/tv" },
  { title: "Popular", url: "/explore/top-series" },
  { title: "Top Rated", url: "/explore/popular-tv" },
];

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div>
      <nav className="bg-gray-900 h-16 relative z-40">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-2 lg:px-4">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 -left-10 flex items-center md:hidden">
                    <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </DisclosureButton>
                  </div>
                  <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                    <NavLink
                      to="/"
                      className="flex flex-shrink-0 items-center"
                    ></NavLink>
                    <div className="hidden md:flex flex-1 items-center py-6 pl-2">
                      <div className="flex space-x-4 items-center pr-4">
                        <NavMovies />
                        <NavTVShow />
                        {/* <NavDiscover /> */}
                      </div>
                    </div>
                    <DisclosureButton
                      role="search"
                      aria-label="search"
                      onClick={() => openSearch()}
                      className="relative -right-2 top-0 hover:cursor-pointer"
                    >
                      <img src="/mag.svg" alt="search" className="w-8 h-8" />
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              {/* Fullscreen Mobile Nav */}
              <DisclosurePanel>
                <div
                  className={`block md:hidden fixed inset-0 mt-16  bg-black  transition-all duration-700 ${
                    open
                      ? "opacity-90 h-screen"
                      : "opacity-0 h-0 pointer-events-none"
                  }`}
                >
                  <div className="flex justify-center flex-wrap mt-6 sm:mt-12 ">
                    <div className="text-white">
                      <div className="flex justify-start items-center p-4 ">
                        <img
                          src="/movie-2.svg"
                          alt="Movies"
                          className="mr-3 w-6 h-5  bg-white"
                        />
                        <h3 className="text-lg font-bold">Movies</h3>
                      </div>
                      <div className="flex flex-col">
                        {moviesNav.map((item, index) => (
                          <DisclosureButton
                          className="transition-all duration-200 ease-in-out bg-white/15 w-50 p-2  rounded-lg text-sm text-white/90 text-center cursor-pointer m-2 hover:transform hover:translate-0.5 hover:text-white hover:bg-[#1B1B1B]" 
                            as={NavLink}
                            key={index}
                            to={item.url}
                          >
                            {item.title}
                          </DisclosureButton>
                        ))}
                      </div>
                    </div>
                    <div className="text-white">
                      <div className="flex justify-start items-center p-4 ">
                        <img
                          src="/tv.svg"
                          alt="Movies"
                          className="mr-3 w-6 h-5  bg-white"
                        />
                        <h3 className="text-lg font-bold">TV Shows</h3>
                      </div>
                      <div className="flex flex-col">
                        {tvNav.map((item, index) => (
                          <DisclosureButton
                            className="transition-all duration-200 ease-in-out bg-white/15 w-50 p-2  rounded-lg text-sm text-white/90 text-center cursor-pointer m-2 hover:transform hover:translate-0.5 hover:text-white hover:bg-[#1B1B1B]" 
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
