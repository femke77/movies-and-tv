import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SeasonNavigation = ({
  selectedSeason,
  setSelectedSeason,
  numSeasons,
  setSelectedEpisode,
}: {
  selectedSeason: number;
  setSelectedSeason: (_season: number) => void;
  numSeasons: number;
  setSelectedEpisode: (_episode: number) => void;
}) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextSeasonRequest = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSelectedSeason(selectedSeason === numSeasons ? 1 : selectedSeason + 1);
      setSelectedEpisode(1);
    }, 150);
  };
  const handlePrevSeasonRequest = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSelectedSeason(selectedSeason === 1 ? numSeasons : selectedSeason - 1);
      setSelectedEpisode(1);
    }, 150);
  };
  return (
    <div className='w-full flex items-center justify-around'>
      <button
        className={`hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] opacity-100`}
        onClick={handlePrevSeasonRequest}
      >
        <ArrowLeft size={20} color='#ffffff' />
      </button>
      <p>
        Season {selectedSeason} of {numSeasons}
      </p>
      <button
        className={`hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] opacity-100`}
        onClick={handleNextSeasonRequest}
      >
        <ArrowRight size={20} color='#ffffff' />
      </button>
    </div>
  );
};
export default SeasonNavigation;
