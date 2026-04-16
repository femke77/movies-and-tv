import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import clsx from 'clsx';

const Header = ({
  children,
  isTvBrowser = false,
}: {
  children: ReactNode;
  isTvBrowser?: boolean;
}) => {
  return (
    <header className='bg-[#222222]'>
      <div
        className='absolute left-0 right-0 z-50 bg-gray-900 flex items-center px-3 pt-2 w-full justify-between'
        style={{
          top: isTvBrowser ? '1.5rem' : '0px',
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <h1>
          <Link
            to='/'
            className={clsx(
              'bg-gray-900 font-kyrilla text-[1.85rem] sm:text-[2.1rem] md:text-[2.2rem] lg:text-[2.4rem] font-semibold m-0 py-3 mr-8 whitespace-nowrap',
              isTvBrowser
                ? 'text-white tracking-[0.02em]'
                : 'bg-gradient-to-r from-white to-gray-500/70 text-transparent bg-clip-text',
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
