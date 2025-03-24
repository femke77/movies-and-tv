import { useEffect, useState } from 'react';

interface WatchItem {
  title: string;
  posterPath: string;
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
          <h1 className="text-xl">Continue Watching</h1>
          <div className="flex">
            {Object.keys(items).map((key: string) => {
              return (
                <div className="text-white relative" key={key}>
                  <h2 className="relative top-1/2 left-5 text-xl font-bold">
                    {items[key].title}
                  </h2>
                  <img
                    className="rounded-xl mx-2"
                    src={`https://image.tmdb.org/t/p/w300${items[key].posterPath}`}
                    alt="poster"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default ContinueWatching;
