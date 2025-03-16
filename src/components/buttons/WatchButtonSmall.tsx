import { useNavigate } from 'react-router-dom';
// TODO refactor to just have one watch page

const WatchButton = ({
  itemType,
  id,
  season = '1',
  episode = '1',
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
      navigate('/watch/tv/' + id + '/' + season + '/' + episode);
    }
  };

  return (
    <button
      onClick={handleClick}
      className='rounded-[50%] mt-6 cursor-pointer w-[65px] h-[65px] flex items-center  bg-white text-black  hover:bg-gray-200'
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
