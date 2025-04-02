import { IEpisode } from '../../interfaces/IEpisode';
import dayjs from 'dayjs';

const Episode = ({
  episode,
  selectedSeason,
  selectedEpisode,
  setSelectedSeason,
  setSelectedEpisode,
}: {
  episode: IEpisode;
  selectedSeason: number;
  selectedEpisode: number;
  setSelectedEpisode: (_episode: number) => void;
  setSelectedSeason: (_season: number) => void;
}) => {
  const handleEpisodeClick = (value: string) => {
    const [season_num, episode_num] = value.split('-');
    setSelectedEpisode(parseInt(episode_num));
    setSelectedSeason(parseInt(season_num));
  };

  return (
    <button
      value={`${episode?.season_number}-${episode?.episode_number}`}
      onClick={(e) => handleEpisodeClick(e.currentTarget.value)}
      className={`flex flex-wrap sm:flex-nowrap text-[12px]  rounded-lg p-2 w-full border border-[#303030] mb-2 ${
        episode?.episode_number === selectedEpisode &&
        episode?.season_number === selectedSeason
          ? 'bg-[#303030]'
          : ''
      }`}
    >
      <div className=' w-[160px] h-[90px] relative overflow-hidden rounded-lg ml-3 mt-2'>
        <img
          src={
            episode?.still_path
              ? `https://image.tmdb.org/t/p/w300${episode?.still_path}`
              : '/noimage2.webp'
          }
          loading='lazy'
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/noimage2.webp';
          }}
          alt={episode?.name}
          className={`h-full w-full object-cover ${
            episode?.still_path ? '' : 'filter grayscale-50'
          }`}
        />
      </div>

      <div className='text-left flex flex-col min-w-0 px-4 w-full sm:w-1/2 mt-2 sm:mt-0'>
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
    </button>
  );
};
export default Episode;
