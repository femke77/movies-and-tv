import dayjs from 'dayjs';
import type { IItem } from '../../interfaces/IItem';
import { useItemLogos } from '../../hooks/useTrendingWithLogoFetch';
import genresData from '../../utils/data/genres.json';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useState, useLayoutEffect, lazy } from 'react';
import BookmarkBtn from '../buttons/BookmarkBtn';
import Tooltip from '../modals/ToolTip';

const UserRating = lazy(() => import('../UserRating'));
const WatchButton = lazy(() => import('../buttons/WatchButtonSmall'));

const TextPlaceholder = () => (
  <div className='w-full space-y-2 mb-6'>
    <div className='h-4 bg-gray-700/30 rounded w-3/4'></div>
    <div className='h-4 bg-gray-700/30 rounded w-full'></div>
    <div className='h-4 bg-gray-700/30 rounded w-1/2'></div>
  </div>
);

const ButtonPlaceholder = () => (
  <div className='w-28 h-10 bg-gray-700/30 rounded-full'></div>
);

const Slide = ({
  slide,
  isVisible,
  currentIndex,
  movieList,
  isBookmarked,
}: {
  slide: IItem;
  isVisible: boolean;
  currentIndex: number;
  movieList: IItem[];
  isBookmarked: boolean;
}) => {
  const [highResBgLoaded, setHighResBgLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  const [logoStatus, setLogoStatus] = useState({
    loaded: false,
    visible: false,
  });

  const formattedMovieDate = dayjs(slide.release_date).format('MMM D, YYYY');
  const { genres } = genresData;

  const logoFromQuery = useItemLogos(
    slide.id as number,
    slide.media_type!,
    isVisible,
    currentIndex,
    movieList,
  );
  const displayLogo = logoFromQuery || null;

  const movieGenres = slide?.genre_ids?.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  // image preloading
  useLayoutEffect(() => {
    if (isVisible || currentIndex === 0) {
      // Set content as loaded after a brief delay
    
      // Preload background image
      if (slide.backdrop_path) {
        const bgImg = new Image();
        bgImg.onload = () => setHighResBgLoaded(true);
        bgImg.src = `https://image.tmdb.org/t/p/w1280${slide.backdrop_path}`;
      }

      // Preload poster
      if (slide.poster_path) {
        const posterImg = new Image();
        posterImg.onload = () => setPosterLoaded(true);
        posterImg.src = `https://image.tmdb.org/t/p/w500${slide.poster_path}`;
      }

     return () => {
        // Cleanup function to reset loading states
        setHighResBgLoaded(false);
        setPosterLoaded(false);
      }
    }
  }, [isVisible, currentIndex, slide]);

  // Separate effect for logo loading to avoid race conditions
  useLayoutEffect(() => {
    if ((isVisible || currentIndex === 0) && displayLogo) {
      const logoImg = new Image();
      logoImg.onload = () => {
        setLogoStatus((prev) => ({ ...prev, loaded: true }));
      };
      logoImg.src = `https://image.tmdb.org/t/p/w185${displayLogo}`;
    }
  }, [isVisible, currentIndex, displayLogo]);

  // Show logo after it's loaded and other content is ready
  useLayoutEffect(() => {
    if (logoStatus.loaded && isVisible) {
      const logoTimer = setTimeout(() => {
        setLogoStatus((prev) => ({ ...prev, visible: true }));
      }, 500);

      return () => clearTimeout(logoTimer);
    }
  }, [logoStatus.loaded, isVisible]);

  return (
    <div
      className={` swiper-slide bg-black h-full flex items-center py-10 slide-container overflow-hidden ${
        isVisible ? 'visible' : 'invisible'
      }`}
    >
      <div
        className={clsx(`mt-10 absolute inset-0 bg-cover bg-center md:bg-top transition-opacity 
         duration-1500 ease-in-out ${
           isVisible && highResBgLoaded? 'opacity-100' : 'opacity-0'
         } z-0`)}
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w780${slide.backdrop_path}')`,
        }}
      >
        {/* gradient overlays */}
        <div className='absolute bottom-0 left-0 w-full h-1/4 sm:h-1/2 bg-gradient-to-t from-black to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent' />
      </div>

      {/* card content */}
      <div
        className='max-w-[1800px] mx-auto relative h-full'
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 700ms ease-in-out',
        }}
      >
        {/* left, top - genre, release date, title logo */}
        <div
          className='absolute w-full h-full justify-center mt-5 flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10
          [@media(min-width:1050px)]:justify-center
          [@media(min-width:1050px)]:w-1/2
          [@media(min-width:1050px)]:top-1/2
          [@media(min-width:1050px)]:transform
          [@media(min-width:1050px)]:-translate-y-1/2'
        >
          {/* Genre and date section*/}
          <div
            className={clsx(
              `flex flex-col h-[30px] items-center [@media(min-width:1050px)]:items-start`,
            )}
          >
            <div className={`flex justify-start items-start mb-6 pb-6`}>
              {movieGenres &&
                movieGenres.length >= 1 &&
                movieGenres.slice(0, 1).map((genre) => (
                  <span
                    key={`${genre}-${slide.id}`}
                    className='text-white ml-0 mr-4'
                  >
                    {genre}
                  </span>
                ))}
              <p className='text-white'>&#x2022;</p>
              <p className='text-white font-light ml-4'>
                {slide.media_type === 'movie'
                  ? slide.release_date !== 'Invalid Date'
                    ? formattedMovieDate
                    : null
                  : slide.first_air_date !== 'Invalid Date'
                    ? dayjs(slide.first_air_date).format('MMM D, YYYY')
                    : null}
              </p>
            </div>
          </div>

          {/* Content container */}
          <div className='flex flex-col mt-6 mb-6'>
            {/* Title/logo section */}
            <Link to={`/${slide.media_type}/${slide.id}`} className='block'>
              <div
                className={`flex flex-col items-center [@media(min-width:1050px)]:items-start`}
              >
                {/* Logo  */}
                <div className='h-[150px] my-6 mt-6 mb-10 flex items-center justify-center [@media(min-width:1050px)]:justify-start'>
                  {displayLogo ? (
                    <div className='relative h-[120px] flex items-center'>
                      {/* Safari-friendly image rendering */}
                      <img
                        className={`h-auto max-h-[250px] transition-all duration-800 ease-in-out ${
                          logoStatus.visible && isVisible
                            ? 'opacity-100 transform-none'
                            : 'opacity-0 translate-y-2'
                        }`}
                        src={`https://image.tmdb.org/t/p/w185${displayLogo}`}
                        alt={slide.title || slide.name}
                        width={250}
                        height={120}
                        onLoad={() =>
                          setLogoStatus((prev) => ({ ...prev, loaded: true }))
                        }
                      />
                    </div>
                  ) : (
                    <h2 className='text-5xl font-bold text-white'>
                      {slide.title || slide.name}
                    </h2>
                  )}
                </div>

                {/* Overview text with placeholder */}
                {isVisible ? (
                  <p className='text-white line-clamp-3 text-center [@media(min-width:1050px)]:text-left mb-10 h-[72px] px-0 sm:px-6 [@media(min-width:1050px)]:px-0'>
                    {slide.overview}
                  </p>
                ) : (
                  <TextPlaceholder />
                )}
              </div>
            </Link>

            {/* Buttons section */}
            <div
              className={clsx(
                `flex flex-row items-center w-full justify-center [@media(min-width:1050px)]:justify-start mt-2 h-[50px]`,
              )}
            >
              <div className='mr-6'>
                {isVisible ? (
                  <UserRating rating={slide.vote_average ?? 0} />
                ) : (
                  <div className='w-12 h-12 bg-gray-700/30 rounded-full'></div>
                )}
              </div>
              <div className='mr-6'>
                {isVisible ? (
                  <Tooltip text='Watch Now'>
                    <WatchButton
                      itemType={slide.media_type!}
                      id={slide.id! as string}
                    />
                  </Tooltip>
                ) : (
                  <ButtonPlaceholder />
                )}
              </div>
              <div className=' mr-6 rounded-[50%] cursor-pointer w-[64px] h-[64px] flex items-center bg-[#ffffff1a] border-2 border-white/20 backdrop-blur-[5px] hover:bg-gray-700'>
                {/* Bookmark */}
                <div className='mx-auto mt-1 '>
                  <Tooltip
                    mb='mb-5'
                    text={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <BookmarkBtn
                      id={slide.id! as string}
                      type={slide.media_type!}
                      isBookmarked={isBookmarked}
                      color='white'
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poster image with placeholder */}
        {slide.poster_path && (
          <div className='hidden [@media(min-width:1050px)]:block [@media(min-width:1050px)]:absolute [@media(min-width:1050px)]:right-0 [@media(min-width:1050px)]:top-1/2 [@media(min-width:1050px)]:transform [@media(min-width:1050px)]:-translate-y-1/2 mr-16 md:mr-20 lg:mr-40 mt-3 [@media(min-width:1050px)]:h-[450px] [@media(min-width:1050px)]:w-[320px] z-10'>
            {/* Poster placeholder */}
            <div
              className={`w-78 h-[450px] rounded-lg bg-gray-800/50 absolute ${
                posterLoaded ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ transition: 'opacity 300ms ease-in-out' }}
            />

            {/* Actual poster with simplified loading */}
            <img
              className={`w-full h-auto rounded-lg object-cover transition-opacity duration-500 ${
                posterLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
              alt={slide.title || slide.name}
              loading='eager'
              width={320}
              height={450}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/no_poster_available.svg';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
