import { IEpisode } from '../../interfaces/IEpisode';
import Episode from '../cards/EpisodeCard';
import { useEffect } from 'react';

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
  useEffect(() => {
    const episode = episodes.find(
      (episode: IEpisode) =>
        episode.season_number === selectedSeason &&
        episode.episode_number === selectedEpisode,
    );
    if (episode) {
      const element = document.getElementById(
        `episode-${selectedSeason}-${selectedEpisode}`,
      );
      if (element) {
        const container = element.closest('.episode-list');
        if (container) {
          container.scrollTop =
            (element as HTMLElement).offsetTop -
            (container as HTMLElement).offsetTop -
            container.clientHeight / 2 +
            element.clientHeight / 2;
        }
      }
    }
    // Scroll to the selected episode only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='episode-list max-h-[700px] overflow-y-auto p-[16px] mb-3 '>
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
