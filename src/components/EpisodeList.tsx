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
    <div className='max-h-[750px] overflow-y-auto p-[16px] '>
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
