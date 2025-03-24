import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import SimpleSlider from './containers/SimpleCarousel';

interface WatchItem {
  title: string;
  posterPath: string;
  media_type: string;
  id: number;
  episode?: number;
  season?: number;
  release_date?: string;
  runtime?: number;
}

interface WatchItems {
  [key: string]: WatchItem;
}

const ContinueWatching = () => {
  const [items, setItems] = useState<WatchItems>({});
  useEffect(() => {
    const continueWatching = localStorage.getItem('continueWatching');
    if (continueWatching) {
      setItems(JSON.parse(continueWatching));
    }
  }, []);
  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const newItems = { ...items };
    delete newItems[key];
    setItems(newItems);
    localStorage.setItem('continueWatching', JSON.stringify(newItems));
  };

  return (
    <div>
      {Object.keys(items).length !== 0 && (
        <>
          <h1 className='text-2xl font-semibold'>Continue Watching</h1>
          <div className='flex'>
            <SimpleSlider>
              {Object.keys(items).map((key: string) => {
                return (
                  <div className='text-white relative flex-shrink-0' key={key}>
                    <div className='relative group'>
                      {/* Image and gradient overlay */}
                      <img
                        className='rounded-xl mr-2'
                        src={`https://image.tmdb.org/t/p/w300${items[key].posterPath}`}
                        alt='poster'
                      />
                      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent' />
                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl'></div>

                      <div className='absolute top-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10'>
                        <button
                          className='rounded-full cursor-pointer bg-black/60 p-2 hover:bg-black/80 transition-colors'
                          onClick={(e) => handleDelete(e, key)}
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
                      {/* Title and info */}
                      <div className='absolute bottom-0 left-0 w-full px-5 pb-4'>
                        <h2 className='text-xl font-bold'>
                          {items[key].title}
                        </h2>
                        <h3 className='text-lg'>
                          {items[key].media_type === 'tv' ? (
                            <p>
                              S{items[key].season}, E{items[key].episode}
                            </p>
                          ) : (
                            <p>
                              {dayjs(items[key].release_date).format('YYYY')}{' '}
                              &#x2022; {items[key].runtime} min
                            </p>
                          )}
                        </h3>
                      </div>

                      {/* Play button overlay - only appears on hover */}
                      <div className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 '>
                        <Link
                          to={`/watch/${items[key].media_type}/${items[key].id}`}
                          className='rounded-full bg-white/20 p-4 backdrop-blur-sm '
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
                  </div>
                );
              })}
            </SimpleSlider>
          </div>
        </>
      )}
    </div>
  );
};
export default ContinueWatching;
