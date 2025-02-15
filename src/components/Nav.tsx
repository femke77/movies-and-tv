import { useState, useEffect, useRef } from "react";
import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import NavMovies from "./NavComponents/NavMovies";
import NavTVShow from "./NavComponents/NavTVShow";
import NavDiscover from "./NavComponents/NavDiscover";
import Search from "./Search";

export default function Navigation({setSearchQuery}: {setSearchQuery: (query: string) => void}) {
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
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
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
                        <NavDiscover />
                      </div>
                    </div>
                    <button
                      role="search"
                      aria-label="search"
                      onClick={() => openSearch()}
                      className="relative -right-2 top-0 z-50"
                    >
                      <img src="/mag.svg" alt="search" className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Fullscreen Mobile Nav */}
              <div
           
                className={`fixed inset-0 mt-16 bg-black bg-opacity-80 flex items-center justify-center transition-all duration-700 ${
                  open
                    ? "opacity-90 h-screen"
                    : "opacity-0 h-0 pointer-events-none"
                }`}
              ></div>
              {/* TODO Mobile view needs buttons here*/}
            </>
          )}
        </Disclosure>
      </nav>
      
      {/* Search Bar */}
      {isVisible && (
        <div ref={searchRef}>
        <Search searchOpen={searchOpen} closeSearch={closeSearch} setSearchQuery={setSearchQuery} />
    </div>
      )}
    </div>
  );
}