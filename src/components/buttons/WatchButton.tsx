import { useNavigate } from 'react-router-dom';
// TODO refactor to just have one watch page

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
      navigate('/watch/tv/' + id)
    }
  };

  return (
    <button
      onClick={handleClick}
      className='cursor-pointer w-[120px] h-[35px] sm:h-[40px] sm:w-full flex items-center mt-4 bg-white text-black px-1 sm:px-4 py-1 sm:py-1.5 rounded-lg hover:bg-gray-200'
    >
      <img
        src='/play.svg'
        alt='play button'
        height='15px'
        width='15px'
        className='mr-2 '
      />
      <p className='text-sm/4 font-bold sm:text-lg/6'> Watch Now</p>
    </button>
  );
};

export default WatchButton;
