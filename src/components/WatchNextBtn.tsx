const WatchNextBtn = () => {
  const watchNext = () => {
  //  TODO : implement watch next
  };

  return (
    <button
    className="next-button flex hover:cursor-pointer mx-2 bg-gray-700/50 p-2 px-4 pl-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px]"
    onClick={watchNext}
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
