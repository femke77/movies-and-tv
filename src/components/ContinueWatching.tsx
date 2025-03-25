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
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  

  useEffect(() => {
    const continueWatching = localStorage.getItem('continueWatching');
 
    
    if (continueWatching) {
      setItems(JSON.parse(continueWatching));
    }
  }, []);

  const handleDelete = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
    key: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      const newItems = { ...items };
      delete newItems[key];
      setItems(newItems);
      setActiveItemId(null);
      localStorage.setItem('continueWatching', JSON.stringify(newItems));
    }, 200);
  };

  return (
    <div>
      {Object.keys(items).length !== 0 && (
        <>
          <h1 className="text-2xl font-semibold mb-4">Continue Watching</h1>
          <div className="flex">
            <SimpleSlider>
              {Object.keys(items).map((key: string) => {
                const isActive = activeItemId === key;
                return (
                  <div
                    className="text-white relative flex-shrink-0"
                    key={key}
                    onTouchStart={() => {
                      setActiveItemId(key);
                    }}
                    onMouseEnter={() => setActiveItemId(key)}
                    onMouseLeave={() => setActiveItemId(null)}
                  >
                    <div className={`relative ${isActive ? 'active' : ''}`}>
                      {/* Image and gradient overlay */}
                      {items[key].posterPath ? (
                        <img
                          className="rounded-xl mr-2 w-86 h-50"
                          src={`https://image.tmdb.org/t/p/w780${items[key].posterPath}`}
                          alt="poster"
                        />
                      ) : (
                        <img
                          className="rounded-xl mr-2  object-cover w-86 h-50"
                          src="/noimage2.webp"
                          alt="no image available"
                        />
                      )}

                      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent" />
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
                        <div className="absolute right-2 z-50 p-2 pointer-events-auto">
                          <button
                            className="text-white font-bold rounded-full z-50 cursor-pointer bg-black/60 p-2 hover:bg-black/80 "
                            onTouchStart={(e) => handleDelete(e, key)}
                            onClick={(e) => handleDelete(e, key)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Title and info */}
                      <div className="absolute bottom-0 left-0 w-full px-5 pb-4">
                        <h2 className="text-xl font-bold">
                          {items[key].title}
                        </h2>
                        <h3 className="text-lg">
                          {items[key].media_type === 'tv' ? (
                            <p>
                              S{items[key].season}, E{items[key].episode}
                            </p>
                          ) : (
                            <p>
                              {dayjs(items[key].release_date).format('YYYY') === 'Invalid Date' ? 'Unknown Date ': dayjs(items[key].release_date).format('YYYY')}{' '}
                              &#x2022; {items[key].runtime || '0'} min
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
                          to={`/watch/${items[key].media_type}/${items[key].id}`}
                          className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="white"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
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
