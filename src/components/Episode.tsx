import { IEpisode } from '../interfaces/IEpisode';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

// TODO episode clickable to play it

const Episode = ({ episode }: { episode: IEpisode }) => {
  
  const {season_number, episode_number} = useParams<{season_number: string, episode_number: string}>();

 
  return (
    <div className={`flex flex-wrap sm:flex-nowrap text-[12px]  rounded-lg p-2 w-full border border-[#303030] mb-2 ${episode?.episode_number === parseInt(episode_number!) && episode?.season_number === parseInt(season_number!) ? 'bg-[#303030]' : ''}`}>
      <div className='w-[160px] h-[90px] relative overflow-hidden rounded-lg ml-3 mt-2'>
        <img
          src={
            episode?.still_path
              ? `https://image.tmdb.org/t/p/w300${episode?.still_path}`
              : '/noimage2.webp'
          }
          alt={episode?.name}
          className={`h-full w-full object-cover ${episode?.still_path ? '' : 'filter grayscale-50'}`}
        />
      </div>

      <div className='flex flex-col min-w-0 px-4 w-full sm:w-1/2 mt-2 sm:mt-0'> 
        <h1 className='text-white text-[14px] pb-1'>{episode?.name}</h1>
        <p className='text-gray-400 line-clamp-2 text-ellipsis'>
          {episode?.overview}
        </p>
        <div className='flex gap-2 mt-2'>
          <p className='text-gray-400'>{episode?.runtime || 0} min</p> &#x2022;
          <p className='text-gray-400'>
            {dayjs(episode?.air_date).format('MMM D, YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Episode;
