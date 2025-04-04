import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

const Header = ({ children }: { children: ReactNode }) => {
  const [hideHeader, setHideHeader] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className='bg-[#222222]'>
      <div
        ref={headerRef}
        className={clsx(
          `fixed top-0 left-0 right-0 bg-gray-900 flex-1 items-center px-3  w-full flex justify-between  transition-transform duration-300 ${
            hideHeader ? '-translate-y-full' : 'translate-y-0'
          }`,
        )}
      >
        <h1>
          <Link
            to='/'
            className='bg-gray-900 font-kyrilla text-[1.85rem] sm:text-[2.1rem] md:text-[2.2rem] lg:text-[2.4rem] font-semibold bg-gradient-to-r from-white to-gray-500/70 text-transparent bg-clip-text m-0 py-3 mr-8'
          >
            BingeBox
          </Link>
        </h1>
        {children}
      </div>
    </header>
  );
};

export default Header;
