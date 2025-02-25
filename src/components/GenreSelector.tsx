import { IGenre } from '../interfaces/IGenre';
import { useWindowSize } from '../hooks/useWindowSize';

const GenreSelector = ({
  genres,
  selectedGenres,
  onGenreToggle,
}: {
  genres: IGenre[];
  selectedGenres: string[];
  onGenreToggle: (_genre: string) => void;
}) => {

  const { width } = useWindowSize();
  return (
    <div className={`grid gap-2 ${width < 400 ? `grid-cols-1 `: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2`}  `}>
      {genres.map((genre) => (
        <button
          onClick={() => onGenreToggle(String(genre.id))}
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
          ${selectedGenres.includes(String(genre.id)) ? 'bg-blue-800  border-blue-900 shadow-[0_0_12px_rgba(0,150,255,0.75)]' : 'bg-white/[0.05]'}
        `}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;
