import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useStore } from '../../state/store';

interface WatchItem {
  title: string;
  poster_path: string;
  media_type: string;
  id: number;
  episode?: number;
  season?: number;
  release_date?: string;
  runtime?: string;
}

const ContinueWatchingCard = ({
  item,
  setActiveItemId,
  isActive,
  activeItemId,
}: {
  item: WatchItem;
  setActiveItemId: (id: string | null) => void;
  isActive: boolean;
  activeItemId: string | null;
}) => {
  const { removeFromContinueWatching } = useStore();

  const handleDelete = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      removeFromContinueWatching(
        Number(activeItemId!.split('-')[0]),
        activeItemId!.split('-')[1]
      );
      setActiveItemId(null);
    }, 50);
  };

  return (
    <div
    
    
    className={`relative  w-86 h-50 ${isActive ? 'active' : ''}`}>
      {/* Image and gradient overlay */}
      {item.poster_path ? (
        <img
          className='rounded-xl w-86 h-50'
          src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
          alt={`${item.title}'s backdrop`}
          loading='lazy'
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/noimage2.webp';
          }}
        />
      ) : (
        <img
          className='rounded-xl mr-2  object-cover w-86 h-50'
          src='/noimage2.webp'
          loading='lazy'
          alt='no backdrop available'
        />
      )}
      {/* <div className ={`bg-white absolute bottom-0 left-0 w-20 h-[4px] rounded-xl z-5`}></div> */}

      <div className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent' />
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 rounded-xl ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      <div
        className={`absolute top-0 right-2 transition-opacity duration-200 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className='absolute right-2 z-50 p-2 pointer-events-auto'>
          <button
            tabIndex={isActive ? 0 : -1}
            aria-label='Remove item'
            className='text-white font-bold rounded-full z-50 cursor-pointer bg-black/60 p-2 hover:bg-black/80 focus:outline-2 focus:outline-white '
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDelete(e);
              }
            }}
            onTouchStart={(e) => handleDelete(e)}
            onClick={(e) => handleDelete(e)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Title and info */}
      <div className='absolute bottom-0 left-0 w-full px-5 pb-4'>
        <h2 className='text-xl font-bold'>{item.title}</h2>
        <h3 className='text-lg'>
          {item.media_type === 'tv' ? (
            <p>
              S{item.season}:E{item.episode}
            </p>
          ) : (
            <p>
              {dayjs(item.release_date).format('YYYY') === 'Invalid Date'
                ? 'Unknown Date '
                : dayjs(item.release_date).format('YYYY')}{' '}
              &#x2022; {Number(item.runtime) || '0'} min
            </p>
          )}
        </h3>
      </div>

      {/* Play button overlay - only appears on hover/touch */}
      <div
        className={`absolute inset-0 flex items-center justify-center  ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Link
          to={`/watch/${item.media_type}/${item.id}`}
          tabIndex={isActive ? 0 : -1}
          className='rounded-full bg-white/20 p-4 backdrop-blur-sm focus:outline-2 focus:outline-white '
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 24 24'
            fill='white'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polygon points='5 3 19 12 5 21 5 3' />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ContinueWatchingCard;
