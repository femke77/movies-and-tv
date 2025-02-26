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
    <header>
      <div
        ref={headerRef}
        className={clsx(`fixed top-0 left-0 right-0 bg-gray-900 flex-1 items-center px-3 pt-1 w-full flex justify-between z-30 transition-transform duration-300 ${
          hideHeader ? '-translate-y-full' : 'translate-y-0'
        }`)}
      >
        <h1>
          <Link
            to='/'
            className='bg-gray-900 font-kyrilla text-2xl sm:text-[1.75rem] font-semibold bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text m-0 py-2 mr-8'
          >
            Movies Unlimited
          </Link>
        </h1>
        {children}
      </div>
    </header>
  );
};

export default Header;
