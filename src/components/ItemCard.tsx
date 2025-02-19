import { IItem } from '../interfaces/IItem';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './UserRating';
import { getStrokeColor } from '../utils/helpers';
import { useEffect, useState } from 'react';
import genreData from '../utils/data/genres.json';
import Chip from './Chip';

const ItemCard = ({
  item,
  itemType,
  showRating,
  showGenres,
  textSize,
}: {
  item: IItem;
  itemType: string;
  showRating: boolean;
  showGenres: boolean;
  textSize: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const formattedReleaseDate = dayjs(item.release_date).format('MMM D, YYYY');
  const formattedAirDate = dayjs(item.first_air_date).format('MMM D, YYYY');
  const { genres } = genreData;
  const strokeColor = getStrokeColor(item.vote_average ?? 0);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const movieGenres = item?.genre_ids?.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId);
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
          <div className='aspect-[2/3] w-full overflow-hidden rounded-lg bg-black'>
            <img
              className='w-full h-full object-cover rounded-b-lg hover:opacity-70 hover:scale-115 hover:bg-opacity-50 transition-all duration-500 ease-in-out '
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
                  : '/no_poster_available.svg'
              }
            />
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
                  <div className='flex flex-col items-end relative -top-7 -left-2'>
                    {movieGenres
                      ?.slice(0, 2)
                      .map((genre) => <Chip label={genre!} key={genre} bg='bg-black/60'/>)}
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

export default ItemCard;
