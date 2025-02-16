import type { ICast } from '../interfaces/ICast';

export const CastCard = ({ cast }: { cast: ICast }) => {
  return (
    <div className='flex flex-col items-center text-center mb-24 w-42'>
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : '/no_cast_photo.jpeg'
        }
        alt={cast.name}
        className='w-42 h-auto rounded-lg'
      />
      <h3 className='text-lg font-semibold mt-4 w-[150px]'>{cast.name}</h3>
      <p className='text-sm w-[150px] text-gray-500'>{cast.character}</p>
    </div>
  );
};
