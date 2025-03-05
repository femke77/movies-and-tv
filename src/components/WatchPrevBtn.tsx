const WatchPrevBtn = ({  selectedEpisode,
  setSelectedEpisode,}:
{
  selectedEpisode: number;
  setSelectedEpisode: (episode: any) => void;
}) => {

  return (
    <button
      className='back-button flex hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px]'
      onClick={()=>setSelectedEpisode(selectedEpisode - 1)}
    
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-arrow-left'
      >
        <path d='m12 19-7-7 7-7'></path>
        <path d='M19 12H5'></path>
      </svg>
      <p className='text-sm ml-1'> Prev</p>
    </button>
  );
};

export default WatchPrevBtn;
