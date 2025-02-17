const WatchButton = () => {
  return (
    <button className='flex items-center mt-5 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200'>
      <img src='/play.svg' height='15px' width='15px' className='mr-2' />
     <p className="text-sm/4 font-bold sm:text-lg/6"> Watch Now</p>
    </button>
  );
};

export default WatchButton;
