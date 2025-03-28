import { IEpisode } from '../interfaces/IEpisode';
import Episode from './Episode';

const EpisodeList = ({
  episodes,
  selectedSeason,
  selectedEpisode,
  setSelectedSeason,
  setSelectedEpisode,
}: {
  episodes: IEpisode[];
  selectedSeason: number;
  selectedEpisode: number;
  setSelectedEpisode: (_episode: number) => void;
  setSelectedSeason: (_season: number) => void;
}) => {
  return (
    <div className='max-h-[700px] overflow-y-auto p-[16px] mb-3 '>
      {episodes &&
        episodes.map((episode: IEpisode) => (
          <Episode
            key={episode.id}
            episode={episode}
            selectedSeason={selectedSeason}
            selectedEpisode={selectedEpisode}
            setSelectedEpisode={setSelectedEpisode}
            setSelectedSeason={setSelectedSeason}
          />
        ))}
    </div>
  );
};
export default EpisodeList;
