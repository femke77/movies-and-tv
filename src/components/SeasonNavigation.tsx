const SeasonNavigation = ({
  selectedSeason,
  setSelectedSeason,
  numSeasons,
}: {
  selectedSeason: number;
  setSelectedSeason: (_season: number) => void;
  numSeasons: number;
}) => {
  return (
    <div className="w-full flex items-center justify-around">
      <button
        className="hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] "
        disabled={selectedSeason === 1}
        onClick={() => setSelectedSeason(selectedSeason - 1)}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>{" "}
      </button>
      <p>
        Season {selectedSeason} of {numSeasons}
      </p>
      <button
        className="hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] "
        disabled={selectedSeason === numSeasons}
        onClick={() => setSelectedSeason(selectedSeason + 1)}
      >
        {" "}
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
    </div>
  );
};
export default SeasonNavigation;
