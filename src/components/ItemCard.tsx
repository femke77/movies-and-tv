import { IMovie } from '../interfaces/IMovie';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './UserRating';
import { getStrokeColor } from '../utils/helpers'

const ItemCard = ({ item, itemType }: { item: IMovie; itemType: string }) => {
  
  const formattedDate = dayjs(item.release_date).format('MMM D, YYYY');
  const strokeColor = getStrokeColor(item.vote_average);

  return (
    <div className='relative flex flex-col items-center justify-between w-48 h-[375px] bg-black rounded-xl shadow-lg overflow-hidden'>
      <Link to={`/${itemType}/${item.id}`}>
        <img
          className='w-full h-72 object-cover rounded-lg'
      
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt={item.title}
        />
        <div className='flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black'>
          <div className='relative -top-13 left-3 w-full'>
            <div className='flex items-end'>
              <UserRating
                rating={item.vote_average}
                color={strokeColor}
                width='w-12'
                height='h-12'
              />
              {/* TODO pill or chip and show genres conditionally */}
              {/* <p className='ml-12'>{movieGenres[0]}</p> */}
            </div>
            <h2 className='whitespace-pre max-w-[192px] overflow-hidden text-sm/6 font-bold -ml-2 mt-1'>
              {item.title}
            </h2>
            <p className='text-xs font-light -ml-2 '>
              {formattedDate} &#x2022;{' '}
              {itemType.substring(0, 1).toUpperCase() + itemType.substring(1)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
