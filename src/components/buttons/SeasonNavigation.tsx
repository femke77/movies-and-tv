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
    if (selectedSeason === numSeasons) return;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSelectedSeason(selectedSeason + 1);
      setSelectedEpisode(1);
    }, 250);
  };
  const handlePrevSeasonRequest = () => {
    if (selectedSeason === 1) return;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSelectedSeason(selectedSeason - 1);
      setSelectedEpisode(1);
    }, 250);
  };
  return (
    <div className="w-full flex items-center justify-around">
      <button
        className={`hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] ${
          selectedSeason === 1 ? 'opacity-50' : 'opacity-100'
        }`}
        disabled={selectedSeason === 1}
        onClick={handlePrevSeasonRequest}
      >
        <ArrowLeft size={20} color="#ffffff" />
      </button>
      <p>
        Season {selectedSeason} of {numSeasons}
      </p>
      <button
        className={`hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] ${
          selectedSeason === numSeasons ? 'opacity-50' : 'opacity-100'
        }`}
        disabled={selectedSeason === numSeasons}
        onClick={handleNextSeasonRequest}
      >
        <ArrowRight size={20} color="#ffffff" />
      </button>
    </div>
  );
};
export default SeasonNavigation;
