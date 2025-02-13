import { IMovie } from '../interfaces/IMovie';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import UserRating from './UserRating';
import { getStrokeColor } from '../utils/helpers';
import { useEffect, useState } from 'react';

const ItemCard = ({ item, itemType }: { item: IMovie; itemType: string }) => {
  const formattedDate = dayjs(item.release_date).format('MMM D, YYYY');
  const [isVisible, setIsVisible] = useState(false);
  const strokeColor = getStrokeColor(item.vote_average ?? 0);
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);
  return (
    <div
      className={`relative flex flex-col items-center justify-between w-48 h-[375px] bg-black rounded-xl shadow-lg overflow-hidden 
  transition-opacity duration-500 ease-linear${
    isVisible ? 'opacity-100' : 'opacity-0'
  } `}
    >
      <Link to={`/${itemType}/${item.id}`}>
        <img
          className='w-full min-w-full h-72 object-cover rounded-lg'
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
              : '/noimage.jpg'
          }
        />
        <div className='flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black'>
          <div className='relative -top-13 left-3 w-full'>
            <div className='flex items-end'>
              {/* TODO vote average N/A when not avaliable */}
              <UserRating
                rating={item.vote_average ?? 0}
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
