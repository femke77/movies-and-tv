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

  console.log(items);

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
                    <Link
                      to={`/watch/${items[key].media_type}/${items[key].id}`}
                    >
                      <div className='relative'>
                        <img
                          className='rounded-xl mx-2'
                          src={`https://image.tmdb.org/t/p/w300${items[key].posterPath}`}
                          alt='poster'
                        />
                        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent' />
                        <div className='absolute bottom-0 left-0 w-full pb-4 px-5'>
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
                      </div>
                    </Link>
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
