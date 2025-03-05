const WatchNextBtn = ({
  selectedEpisode,
  setSelectedEpisode,
  selectedSeason,
  setSelectedSeason,
  numSeasons,
  currentSeasonLength,
}: {
  selectedEpisode: number;
  setSelectedEpisode: (_episode: number) => void;
  selectedSeason: number;
  setSelectedSeason: (_season: number) => void;
  numSeasons: number;
  currentSeasonLength: number;
}) => {

  const handleNextEpisodeRequest = () => {
    // switching to next season if available
    if (
      selectedEpisode === currentSeasonLength &&
      selectedSeason < numSeasons
    ) {
      setSelectedSeason(selectedSeason + 1);
      setSelectedEpisode(1);
    }
    // continuing to next episode
    else if (
      !(
        selectedEpisode === currentSeasonLength && selectedSeason === numSeasons
      )
    ) {
      setSelectedEpisode(selectedEpisode + 1);
      // disable button and stopping if last episode of last season
    } 
  };

  return (
    <button
      className={`next-button flex hover:cursor-pointer mx-2 bg-gray-700/50 p-2 px-4 pl-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] ${selectedEpisode === currentSeasonLength && selectedSeason === numSeasons ? 'opacity-50' : ''} `}
      onClick={handleNextEpisodeRequest}
      disabled={
        selectedEpisode === currentSeasonLength && selectedSeason === numSeasons
      }
    >
      <p className='text-sm mr-1'> Next</p>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#ffffff'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-arrow-right'
      >
        <path d='M5 12h14' />
        <path d='m12 5 7 7-7 7' />
      </svg>
    </button>
  );
};

export default WatchNextBtn;
