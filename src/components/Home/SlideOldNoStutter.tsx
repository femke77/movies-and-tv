import dayjs from 'dayjs';
import UserRating from '../UserRating';
import WatchButton from '../WatchButton';
import type { IItem } from '../../interfaces/IItem';
import { useItemLogos } from '../../hooks/useTrendingWithLogoFetch';
import genresData from '../../utils/data/genres.json';
import { Link } from 'react-router-dom';
import { useWindowSize } from '../../hooks/useWindowSize';

const Slide = ({
  slide,
  isVisible,
  currentIndex,
  movieList,
}: {
  slide: IItem;
  isVisible: boolean;
  currentIndex: number;
  movieList: IItem[];
}) => {
  const formattedMovieDate = dayjs(slide.release_date).format('MMM D, YYYY');
  const { genres } = genresData;
  const { width } = useWindowSize();
  const logoFromQuery = useItemLogos(
    slide.id,
    slide.media_type ?? 'movie',
    isVisible,
    currentIndex,
    movieList,
  );
  const displayLogo = logoFromQuery || null;

  const movieGenres = slide.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  return (
    <div className="swiper-slide bg-black h-full flex items-center py-10 ">
      {/* background image */}
      <div
        className={`relative w-full h-full bg-cover bg-center md:bg-top transition-opacity 
        duration-0 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}   `}
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${slide.backdrop_path}')`,
        }}
      >
        {/* gradient overlays */}
        <div className='absolute bottom-0 left-0 w-full h-1/8 sm:h-1/2 bg-gradient-to-t from-black to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent' />

        {/* card content */}
        <div className='max-w-[1800px] mx-auto relative h-full'>
          {/* left, top - genre, release date, title logo */}
          <div 
            className={`absolute flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10 z-0
              ${width < 950 
                ? 'w-full h-full justify-center mt-5' 
                : 'w-1/2 top-1/2 transform -translate-y-1/2 mt-5'}`}
          >
            {/* Genre and date section - always at top */}
            <div className={`flex flex-col ${width < 950 ? 'items-center' : 'items-start'}`}>
              <div className={`flex justify-start items-start mb-6 pb-6`}>
                {movieGenres.length >= 1 &&
                  movieGenres.slice(0, 2).map((genre) => (
                    <span
                      key={`${genre}-${slide.id}`}
                      className='text-white ml-0 mr-4'
                    >
                      {genre}
                    </span>
                  ))}
                {slide.media_type === 'movie' && (
                  <p className='text-white'>&#x2022;</p>
                )}

                <p className='text-white font-light ml-4'>
                  {slide.media_type === 'movie'
                    ? slide.release_date !== 'Invalid Date'
                      ? formattedMovieDate
                      : null
                    : null}
                </p>
              </div>
            </div>

            {/* Content container */}
            <div className="flex flex-col">
              {/* Title/logo section */}
              <Link to={`/${slide.media_type}/${slide.id}`} className="block">
                <div className={`flex flex-col ${width < 950 ? 'items-center' : 'items-start'}`}>
                  {displayLogo ? (
                    <img
                      className='mb-6 w-64 h-auto'
                      src={`https://image.tmdb.org/t/p/w185${displayLogo}`}
                      alt={slide.title || slide.name}
                    />
                  ) : (
                    <h2 className='text-4xl font-bold text-white mb-6'>
                      {slide.title || slide.name}
                    </h2>
                  )}
                  <p className='text-white line-clamp-2 md:line-clamp-3 text-center md:text-left mb-6'>
                    {slide.overview}
                  </p>
                </div>
              </Link>

              {/* Buttons section */}
              <div className={`flex flex-row items-center ${width < 950 ? 'justify-center' : 'justify-start'} mt-2`}>
                <div className='mb-2 mr-10'>
                  <WatchButton />
                </div>
                <div className='mb-2'>
                  <UserRating rating={slide.vote_average ?? 0} />
                </div>
              </div>
            </div>
          </div>
          
          {/* right, only - poster image */}
          <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 md:mr-20 lg:mr-40 mt-5 ${width < 950 ? 'hidden' : 'block'} z-0`}>
            {slide.poster_path && (
              <img
                className='w-78 h-auto rounded-lg'
                src={
                  slide.poster_path
                    ? `https://image.tmdb.org/t/p/w500${slide.poster_path}`
                    : '/no_poster_available.svg'
                }
                alt={slide.title || slide.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;