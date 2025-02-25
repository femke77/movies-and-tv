import { IGenre } from '../interfaces/IGenre';
import { useWindowSize } from '../hooks/useWindowSize';

const GenreSelector = ({
  genres,
  selectedGenres,
  onGenreToggle,
  deselectedGenres,
  onUnwantedGenreToggle,
}: {
  genres: IGenre[];
  selectedGenres: string[];
  onGenreToggle: (_genre: string) => void;
  deselectedGenres: string[];
  onUnwantedGenreToggle: (_genre: string) => void;
}) => {
  const { width } = useWindowSize();

  return (
    <>
      <p className='ml-4 text-white/65'>
        Genres (Click to include, right click to exclude)
      </p>
      <div
        className={`grid gap-2 mt-4 ${
          width < 400
            ? `grid-cols-1 `
            : `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols- gap-2`
        }  `}
      >
        {genres.map((genre) => (
          <button
            onClick={() => onGenreToggle(String(genre.id))}
            onContextMenu={(e) => {
              e.preventDefault();
              onUnwantedGenreToggle(String(genre.id));
              console.log('Right Click ' + genre.id);
            }}
            key={genre.id}
            className={`
          border
          border-white/10
          rounded-xl
          p-3
          text-white
          text-center
          cursor-pointer
          transition-all
          duration-300
          ease-in-out
          select-none
          text-sm
          whitespace-nowrap
          m-2
          min-w-[150px]
          hover:border-blue-700
          hover:translate-[2px]
          ${
            selectedGenres.includes(String(genre.id))
              ? 'bg-blue-800 border-blue-900'
              : deselectedGenres.includes(String(genre.id))
                ? 'bg-red-800 border-red-900'
                : 'bg-white/[0.05]'
          }
        `}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default GenreSelector;
