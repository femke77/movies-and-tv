import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  const [openSection, setOpenSection] = useState<
    'about' | 'discover' | 'genres' | 'legal' | null
  >(null);

  const toggleSection = (
    section: 'about' | 'discover' | 'genres' | 'legal',
  ) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer className='border-t-gray-500 max-w-[1800px] border-t-1 leading-5 mt-8 pt-6 text-center py-4 bg-black relative z-50 text-[#726c6c] text-lg'>
      <div className='flex mx-10 flex-col md:flex-row md:justify-between items-top md:mx-10 md:pr-4 lg:pr-12 pb-10 lg:mx-30'>
        {/* About Section */}
        <div className='flex flex-col items-left text-left md:w-1/5 mb-3'>
          <div className='flex justify-between items-center mb:w-1/5'>
            <h3>About</h3>
            <button
              className='md:hidden'
              onClick={() => toggleSection('about')}
            >
              {openSection === 'about' ? '−' : '+'}
            </button>
          </div>
          <div
            className={`${
              openSection === 'about' ? 'block' : 'hidden'
            } md:block`}
          >
            <p className='text-white/70 text-sm text-left flex items-center my-2'>
              Stream movies & tv shows on demand. BingeBox24/7 wants to be your go-to site to stream movies & tv. We are hard at work planning new features for your viewing pleasure!
            </p>
          <Link to='/faqs' className='text-white/70 text-md mt-2 font-bold'>
            FAQs
          </Link>
          </div>
        </div>

        {/* Discover Section */}
        <div className='flex flex-col items-left text-left mb-3'>
          <div className='flex justify-between items-center'>
            <h3>Discover</h3>
            <button
              className='md:hidden'
              onClick={() => toggleSection('discover')}
            >
              {openSection === 'discover' ? '−' : '+'}
            </button>
          </div>
          <div
            className={`${
              openSection === 'discover' ? 'block' : 'hidden'
            } md:flex mt-2 flex flex-col items-left text-left text-white/70 text-sm`}
          >
            <Link to='/explore/toprated'>Top Rated Movies</Link>
            <Link to='/explore/top-series'>Top Rated TV</Link>
            <Link to='/explore/popular'>Popular Movies</Link>
            <Link to='/explore/popular-tv'>Popular TV</Link>
            <Link to='/explore/movies'>Trending Movies</Link>
            <Link to='/explore/tv'>Trending TV</Link>
          </div>
        </div>

        {/* Genres Section */}
        <div className='flex flex-col items-left text-left mb-3'>
          <div className='flex justify-between items-center'>
            <h3>Genres</h3>
            <button
              className='md:hidden'
              onClick={() => toggleSection('genres')}
            >
              {openSection === 'genres' ? '−' : '+'}
            </button>
          </div>
          <div
            className={`${
              openSection === 'genres' ? 'block' : 'hidden'
            } md:flex mt-2 flex flex-col items-left text-left text-white/70 text-sm`}
          >
            <Link to='/explore/toprated'>Action</Link>
            <Link to='/explore/top-series'>Adventure</Link>
            <Link to='/explore/popular'>Horror</Link>
            <Link to='/explore/popular-tv'>Animation</Link>
            <Link to='/explore/movies'>Sci Fi</Link>
            <Link to='/explore/popular'>Romance</Link>
            <Link to='/explore/popular'>Comedy</Link>
            <Link to='/explore/popular'>Crime</Link>
          </div>
        </div>

        {/* Legal Section */}
        <div className='flex flex-col items-left text-left mb-3'>
          <div className='flex justify-between items-center'>
            <h3>Legal</h3>
            <button
              className='md:hidden'
              onClick={() => toggleSection('legal')}
            >
              {openSection === 'legal' ? '−' : '+'}
            </button>
          </div>
          <div
            className={`${
              openSection === 'legal' ? 'block' : 'hidden'
            } md:flex mt-2 flex flex-col items-left text-left text-white/70 text-sm`}
          >
            <Link to='/dmca'>DMCA</Link>
            <Link
              to='https://www.themoviedb.org/terms-of-use'
              target='_blank'
              rel='noreferrer'
            >
              Terms of Use
            </Link>
            <Link
              to='https://www.themoviedb.org/privacy-policy'
              target='_blank'
              rel='noreferrer'
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className='text-center mt-6 border-t-gray-500 border-t-1 pt-6'>
        <ul className='col-span-2 flex justify-center items-center gap-6 lg:col-span-5 lg:justify-center mb-3'>
          <li>
            <Link
              to='https://www.facebook.com'
              target='_blank'
              rel='noreferrer'
              className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
            >
              <span className='sr-only'>Facebook</span>

              <svg
                className='size-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              to='https://www.instagram.com'
              rel='noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
            >
              <span className='sr-only'>Instagram</span>

              <svg
                className='size-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              to='https://www.twitter.com'
              rel='noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
            >
              <span className='sr-only'>Twitter</span>

              <svg
                className='size-6'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </Link>
          </li>

          <li>
            <Link
              to='mailto:lcvllc@proton.me'
              rel='noreferrer'
              target='_blank'
              className='text-gray-700 transition hover:opacity-75 dark:text-gray-200'
            >
              <span className='sr-only'>Email</span>

              <Mail color='#29313E' />
            </Link>
          </li>
        </ul>
        <p className='text-white/70 text-sm'>
          &copy; {new Date().getFullYear()} Movies Unlimited. All rights
          reserved.
        </p>
        <Link
          to='http://www.themoviedb.org'
          target='_blank'
          rel='noreferrer'
          className='text-white/70 text-sm'
        >
          <img
            src='/tmdb.svg'
            alt='The Movie Database Logo'
            className='w-44 my-4 mx-auto'
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
