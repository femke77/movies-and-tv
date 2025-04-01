import type { ICast } from '../../interfaces/ICast';
import { Link } from 'react-router-dom';

export const CastCard = ({
  cast,
  cardWidth = 'w-full',
}: {
  cast: ICast;
  cardWidth?: string;
}) => {
  return (
    <div
      className={`flex flex-col flex-1 items-center text-center mb-10 ${cardWidth}`}
    >
      <Link to={`/explore/cast/${cast.id}`} className='relative'>
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
          className='w-full h-auto rounded-lg'
        />
        <h3 className='text-lg font-semibold mt-4'>{cast.name}</h3>
        <p className='text-md  text-gray-400 '>
          {cast.character || cast.known_for_department}
        </p>
      </Link>
    </div>
  );
};
