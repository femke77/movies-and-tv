import { IGenre } from "../interfaces/IGenre";

const GenreSelector = ({
  genres,
  selectedGenres,
  onGenreToggle,
}: {
  genres: IGenre[];
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}) => {


    
  return (
    <div>
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
          min-w-[120px]
          hover:border-blue-700
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
