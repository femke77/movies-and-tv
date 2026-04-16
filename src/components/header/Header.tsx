import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

const Header = ({
  children,
  isTvBrowser = false,
}: {
  children: ReactNode;
  isTvBrowser?: boolean;
}) => {
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
          `fixed left-0 right-0 bg-gray-900 flex-1 items-center px-3 pt-2 w-full flex justify-between transition-transform duration-300 ${
            hideHeader ? '-translate-y-full' : 'translate-y-0'
          }`,
        )}
        style={{
          top: isTvBrowser ? '3.25rem' : '0px',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <h1>
          <Link
            to='/'
            className='bg-gray-900 font-kyrilla text-[1.85rem] sm:text-[2.1rem] md:text-[2.2rem] lg:text-[2.4rem] font-semibold text-white m-0 py-3 mr-8 tracking-[0.02em] whitespace-nowrap'
          >
            BingeBox 24/7
          </Link>
        </h1>
        {children}
      </div>
    </header>
  );
};

export default Header;
