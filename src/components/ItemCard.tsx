import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './UserRating';
import { getStrokeColor } from '../utils/helpers';
import { useEffect, useState, memo } from 'react';
import genreData from '../utils/data/genres.json';
import Chip from './Chip';
import { useWindowSize } from '../hooks/useWindowSize';

const ItemCard = ({
  item,
  itemType,
  showRating,
  showGenres,
  textSize,
}: {
  item: IItem;
  itemType: string;
  showRating?: boolean;
  showGenres?: boolean;
  textSize?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const formattedReleaseDate = dayjs(item.release_date).format('MMM D, YYYY');
  const formattedAirDate = dayjs(item.first_air_date).format('MMM D, YYYY');
  const { genres } = genreData;
  const strokeColor = getStrokeColor(item.vote_average ?? 0);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const posterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : '/no_poster_available.svg';

  const lowResPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
    : '/no_poster_available.svg';
  const movieGenres = item?.genre_ids?.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-between w-full bg-black rounded-xl shadow-lg overflow-hidden 
        transition-opacity duration-500 ease-linear ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Link to={`/${itemType}/${item.id}`} className='w-full'>
          <div className='relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200'>
            {/* Low-res image */}
            <div className='absolute inset-0'>
              <img
                className={`w-full h-full object-cover rounded-b-lg transition-opacity duration-100 ease-in-out blur-[10px]
                  ${lowResLoaded && !highResLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={lowResPath}
                alt=''
                onLoad={() => setLowResLoaded(true)}
              />
            </div>

            {/* High-res image */}
            <div className='absolute inset-0 bg-black'>
              <img
                className={`w-full bg-black h-full object-cover rounded-b-lg hover:opacity-70 hover:scale-110 hover:bg-opacity-50 transition-all duration-300 ease-in-out
                  ${highResLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={posterPath}
                alt={item.name || item.title}
                onLoad={() => setHighResLoaded(true)}
              />
            </div>
          </div>

          <div className='flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black'>
            <div className='relative -top-13 left-3 w-full'>
              <div className='flex min-h-11 items-end justify-between'>
                {showRating && (
                  <UserRating
                    rating={item.vote_average ?? 0}
                    color={strokeColor}
                    width='w-12'
                    height='h-12'
                  />
                )}
                {/* Genres*/}
                {showGenres && movieGenres?.length >= 1 && (
                  <div className='flex justify-end flex-wrap gap-1 relative -top-8 right-3.5 sm:right-2 w-full'>
                    {width > 400 ? (
                      <>
                        {movieGenres
                          ?.slice(0, 2)
                          .map((genre) => (
                            <Chip
                              label={genre!}
                              key={genre}
                              bg='bg-black/60'
                              fontSize={`text-xs sm:text-sm md:text-md `}
                            />
                          ))}
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              <h2
                className={`w-full truncate text-${textSize}/6 -ml-2 mt-1`}
                title={item.name || item.title} // Tooltip for full text on hover
              >
                {item.name || item.title}
              </h2>

              <p className='text-sm font-light -ml-2'>
                {itemType === 'tv'
                  ? formattedAirDate !== 'Invalid Date'
                    ? formattedAirDate
                    : 'Unknown'
                  : formattedReleaseDate !== 'Invalid Date'
                    ? formattedReleaseDate
                    : 'Unknown'}{' '}
                &#x2022; {itemType === 'tv' ? 'TV' : 'Movie'}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

// memoized wrapper for places where the same item is rendered multiple times such as infinite scrolling
const MemoizedItemCard = memo(
  ({
    movie,
    itemType,
    showRating = false,
    showGenres = false,
  }: {
    movie: IItem;
    itemType?: string;
    showRating?: boolean;
    showGenres?: boolean;
  }) => (
    <div className='w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]'>
      <ItemCard
        textSize='xl'
        item={movie}
        showRating={showRating}
        showGenres={showGenres}
        itemType={movie.media_type || itemType || ''}
      />
    </div>
  ),
);

MemoizedItemCard.displayName = 'MemoizedItemCard';

export { ItemCard, MemoizedItemCard };
