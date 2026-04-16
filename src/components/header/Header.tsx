import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const Header = ({
  children,
  isTvBrowser = false,
}: {
  children: ReactNode;
  isTvBrowser?: boolean;
}) => {
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isTvBrowser) return;

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTvBrowser]);

  if (isTvBrowser) {
    return (
      <header className='bg-[#222222]'>
        <div className='fixed top-0 left-0 right-0 z-50 bg-gray-900 flex items-center px-3 w-full justify-between'>
          <h1>
            <Link
              to='/'
              className={clsx(
                'bg-gray-900 font-kyrilla text-[1.85rem] sm:text-[2.1rem] md:text-[2.2rem] lg:text-[2.4rem] font-semibold m-0 py-3 mr-8 whitespace-nowrap',
                'text-white tracking-[0.02em]',
              )}
            >
              BingeBox 24/7
            </Link>
          </h1>
          {children}
        </div>
      </header>
    );
  }

  return (
    <header className='bg-[#222222]'>
      <div
        className={clsx(
          `fixed top-0 left-0 right-0 bg-gray-900 flex-1 items-center px-3 w-full flex justify-between transition-transform duration-300 ${
            hideHeader ? '-translate-y-full' : 'translate-y-0'
          }`,
        )}
      >
        <h1>
          <Link
            to='/'
            className={clsx(
              'bg-gray-900 font-kyrilla text-[1.85rem] sm:text-[2.1rem] md:text-[2.2rem] lg:text-[2.4rem] font-semibold m-0 py-3 mr-8 whitespace-nowrap',
              'bg-gradient-to-r from-white to-gray-500/70 text-transparent bg-clip-text',
            )}
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
