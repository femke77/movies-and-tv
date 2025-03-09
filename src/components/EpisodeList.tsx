import { IEpisode } from '../interfaces/IEpisode';
import Episode from './Episode';

const EpisodeList = ({
  episodes,
  setSelectedSeason,
  setSelectedEpisode,
}: {
  episodes: IEpisode[];
  setSelectedEpisode: (_episode: number) => void;
  setSelectedSeason: (_season: number) => void;
}) => {
  return (
    <div className='max-h-[600px] overflow-y-auto p-[16px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
      {episodes &&
        episodes.map((episode: IEpisode) => (
          <Episode
            key={episode.id}
            episode={episode}
            setSelectedEpisode={setSelectedEpisode}
            setSelectedSeason={setSelectedSeason}
          />
        ))}
    </div>
  );
};
export default EpisodeList;
