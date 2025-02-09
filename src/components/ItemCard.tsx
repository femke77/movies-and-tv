import { IMovie } from '../interfaces/IMovie';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './UserRating';
import genreData from '../utils/data/genres.json';

const ItemCard = ({ item }: { item: IMovie }) => {
  const formattedDate = dayjs(item.release_date).format('MMM D, YYYY');
  const getStrokeColor = (rating: number) => {
    if (rating >= 7.0 && rating <= 10) return 'green';
    if (rating >= 6 && rating < 7.0) return 'orange';
    return 'red';
  };
  const strokeColor = getStrokeColor(item.vote_average);
  const { genres } = genreData;
  const movieGenres = item.genre_ids.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre?.name;
  });

  return (
    <div className='relative flex flex-col items-center justify-center w-48 h-auto bg-white rounded-lg shadow-lg'>
      <Link to={`/movie/${item.id}`}>
        <img
          className='w-full rounded-t-lg'
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt={item.title}
        />
        <div className='flex flex-col items-start justify-start w-full h-18 pt-4 bg-black'>
          <div className='relative -top-13 left-3 w-full'>
            <div className='flex items-end'>
              <UserRating
                rating={item.vote_average}
                color={strokeColor}
                width={12}
              />
              <p className='ml-12'>{movieGenres[0]}</p>
            </div>
            <h2 className='text-sm/6 font-bold -ml-2 mt-1'>{item.title}</h2>
            <p className='text-xs font-light -ml-2 '>{formattedDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
