import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './NewUserRating';
import { useEffect, useState, memo } from 'react';
import genreData from '../utils/data/genres.json';
import Chip from './Chip';
import { useWindowSize } from '../hooks/useWindowSize';
import BookmarkBtn from './buttons/BookmarkBtn';

const ItemCard = ({
  item,
  itemType,
  showRating,
  showGenres,
  textSize = 'md',
  isBookmarked,
}: {
  item: IItem;
  itemType: string;
  showRating?: boolean;
  showGenres?: boolean;
  textSize?: string;
  isBookmarked: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);
  const [highResLoaded, setHighResLoaded] = useState(false);
  const formattedReleaseDate = dayjs(item.release_date).format('MMM D, YYYY');
  const formattedAirDate = dayjs(item.first_air_date).format('MMM D, YYYY');
  const { genres } = genreData;
  const { width } = useWindowSize();

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    if (item.poster_path) {
      const lowResImage = new Image();
      const hiResImage = new Image();

      lowResImage.src = `https://image.tmdb.org/t/p/w92${item.poster_path}`;
      lowResImage.onload = () => {
        setLowResLoaded(true);
      };

      hiResImage.src = `https://image.tmdb.org/t/p/w342${item.poster_path}`;
      hiResImage.onload = () => {
        setHighResLoaded(true);
      };
    }

    return () => {
      setLowResLoaded(false);
      setHighResLoaded(false);
    };
  }, [item]);

  const movieGenres = item?.genre_ids?.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  const PosterPlaceHolder = () => (
    <div className='w-full h-full bg-gray-900 absolute inset-0 z-[1]' />
  );

  // Function to determine the correct text size class
  const getTitleSizeClass = () => {
    switch (textSize) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm ';
      case 'lg':
        return 'text-lg ';
      case 'xl':
        return 'text-xl ';
      case '2xl':
        return 'text-2xl';
      default:
        return 'text-md ';
    }
  };

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-between w-full bg-black rounded-xl shadow-lg  
        transition-opacity duration-500 ease-linear ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Link to={`/${itemType}/${item.id}`} className='w-full '>
          <div className='group relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-900'>
            {item.poster_path ? (
              <>
                {/* Placeholder */}
                {(!lowResLoaded || !highResLoaded) && <PosterPlaceHolder />}
                {/* Low-res image */}
                <div className='absolute inset-0 z-[2]'>
                  <img
                    className={`w-full h-full object-cover rounded-b-lg  transition-opacity duration-400 ease-in-out ${
                      lowResLoaded
                        ? 'opacity-100 blur-0'
                        : 'opacity-0 blur-[10px]'
                    }`}
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt=''
                    onLoad={() => setLowResLoaded(true)}
                  />
                </div>
                {/* High-res image */}
                <div className='absolute inset-0 z-[3]'>
                  <img
                    className={`w-full h-full object-cover rounded-b-lg  hover:scale-110 transition-all duration-300 ease-in-out ${
                      highResLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                    alt={item.name || item.title}
                    onLoad={() => setHighResLoaded(true)}
                  />
                </div>
              </>
            ) : (
              <div>
                <img
                  src='/no_poster_available.svg'
                  alt={'no poster available'}
                />
              </div>
            )}
            <div className='absolute inset-0 z-[4] bg-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50'></div>
            <div className='absolute top-0 -right-1 p-1 z-[5]'>
              <BookmarkBtn
                id={item.id}
                type={itemType}
                isBookmarked={isBookmarked}
                iconSize={35}
                color='white'
              />
            </div>
          </div>
          <div className='flex flex-col h-[80px] mb-6 flex-grow items-start justify-start w-full pt-4 bg-black'>
            <div
              className={`relative -top-15  w-full ${!showRating && 'pt-3'}`}
            >
              <div className='flex min-h-11 pl-1 items-end justify-between'>
                {showRating && (
                  <div className='z-10 relative'>
                    <UserRating
                      rating={item.vote_average ?? 0}
                      width='w-15'
                      height='h-15'
                    />
                  </div>
                )}
                {/* Genres*/}
                {showGenres && movieGenres?.length >= 1 && (
                  <div className='flex justify-end flex-wrap gap-1 relative -top-8 sm:right-2 w-full z-10'>
                    {width > 400 ? (
                      <>
                        {movieGenres
                          ?.slice(0, 2)
                          .map((genre) => (
                            <Chip
                              label={genre!}
                              key={genre}
                              bg='bg-black/70'
                              fontSize={`text-xs sm:text-sm md:text-md `}
                            />
                          ))}
                      </>
                    ) : null}
                  </div>
                )}
              </div>

              <h2
                className={`w-full truncate ${getTitleSizeClass()} leading-6  pl-1 -mt-2 `}
                title={item.name || item.title} // Tooltip for full text on hover
              >
                {item.name || item.title}
              </h2>

              <p className='text-sm font-light pl-1'>
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

const MemoizedItemCard = memo(
  ({
    item,
    itemType,
    showRating = false,
    showGenres = false,
    textSize,
    isBookmarked,
  }: {
    item: IItem;
    itemType?: string;
    showRating?: boolean;
    showGenres?: boolean;
    textSize?: string;
    isBookmarked: boolean;
  }) => (
    <div className='w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]'>
      <ItemCard
        textSize={textSize}
        item={item}
        showRating={showRating}
        showGenres={showGenres}
        itemType={item.media_type || itemType || ''}
        isBookmarked={isBookmarked}
      />
    </div>
  ),
);

MemoizedItemCard.displayName = 'MemoizedItemCard';

export { ItemCard, MemoizedItemCard };
