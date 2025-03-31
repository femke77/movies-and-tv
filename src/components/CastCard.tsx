import type { ICast } from '../interfaces/ICast';
import { Link } from 'react-router-dom';

export const CastCard = ({ cast }: { cast: ICast }) => {
  return (
    <div className='flex flex-col items-center text-center mb-24 w-42'>
      <Link to={`/cast/${cast.id}`} className='relative'>
      <img
        src={
          cast.profile_path
            ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
            : '/no_cast_photo.jpeg'
        }
        alt={`${cast.name}'s headshot`}
        loading='lazy'
        width={200}
        height={300}
        className='w-42 h-auto rounded-lg'
      />
      <h3 className='text-lg font-semibold mt-4 w-[150px]'>{cast.name}</h3>
      <p className='text-md w-[150px] text-gray-400'>{cast.character}</p>
      </Link>
    </div>
  );
};
