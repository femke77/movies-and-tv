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
    <button
      onClick={handleClick}
      aria-describedby='tooltip-id'
      className='rounded-[50%]  cursor-pointer w-[64px] h-[64px] flex items-center  bg-white text-black  hover:bg-gray-200'
    >
      <img
        src='/play.svg'
        alt='black play icon'
        height='35px'
        width='35px'
        className='mx-auto'
      />
    </button>
  );
};

export default WatchButton;
