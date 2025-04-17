import { useNavigate } from 'react-router-dom';

const WatchButton = ({
  itemType,
  id,
}: {
  itemType: string;
  id: string;
  season?: string;
  episode?: string;
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (itemType === 'movie') {
      navigate('/watch/movie/' + id);
    } else {
      navigate('/watch/tv/' + id);
    }
  };

  return (
    <div className='relative z-10 rounded-[50%] cursor-pointer w-[64px] h-[64px]'>
      <button
        onClick={handleClick}
        aria-describedby='tooltip-id'
        className=' rounded-[50%]  cursor-pointer w-[64px] h-[64px] flex items-center  bg-white text-black  hover:bg-gray-200'
      >
        <img
          src='/play.svg'
          alt='black play icon'
          height='35px'
          width='35px'
          className='rounded-[50%] mx-auto'
        />
      </button>
    </div>
  );
};

export default WatchButton;
