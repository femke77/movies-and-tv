const WatchNextBtn = ({
  selectedEpisode,
  setSelectedEpisode,
  selectedSeason,
  setSelectedSeason,
  numSeasons,
  currentSeasonLength,
}: {
  selectedEpisode: number;
  setSelectedEpisode: (episode: any) => void;
  selectedSeason: number;
  setSelectedSeason: (season: any) => void;
  numSeasons: number;
  currentSeasonLength: number;
}) => {
  console.log(selectedEpisode, currentSeasonLength, numSeasons);

  //  if selected episode is the last episode of the season AND there is another season, swtich to the next season, else disable

  // TODO make it go to next season if last episode of current season

  const handleNextEpisodeRequest = () => {
    // switching to next season if available
    if (
      selectedEpisode === currentSeasonLength &&
      selectedSeason < numSeasons
    ) {
      setSelectedSeason(selectedSeason + 1);
      setSelectedEpisode(1);
    } 
    // stopping if last episode of last season
    else if (
      !(
        selectedEpisode === currentSeasonLength && selectedSeason === numSeasons
      )
    ) {
      setSelectedEpisode(selectedEpisode + 1);
    }
  };

  return (
    <button
      className={`next-button flex hover:cursor-pointer mx-2 bg-gray-700/50 p-2 px-4 pl-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] `}
      onClick={handleNextEpisodeRequest}
    >
      <p className="text-sm mr-1"> Next</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-right"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
};

export default WatchNextBtn;
