import { IGenre } from "../interfaces/IGenre";

const GenreSelector = ({
  genres,
  onGenreToggle,
}: {
  genres: IGenre[];

  onGenreToggle: (genre: string) => void;
}) => {
  return (
    <div>
      {genres.map((genre) => (
        <button
          onClick={() => onGenreToggle(String(genre.id))}
          key={genre.id}
          className="px-4 py-2 rounded outline transition-colors duration-200 bg-black text-white hover:bg-gray-300 hover:text-black"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;
