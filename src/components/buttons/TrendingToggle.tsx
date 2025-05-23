import { useState, useEffect } from 'react';

const TrendingToggle = ({
  timePeriod,
  onTimeChange,
}: {
  timePeriod: string;
  onTimeChange: (_value: string) => void;
}) => {
  const [selected, setSelected] = useState(timePeriod);
  const [translateX, setTranslateX] = useState(100);

  useEffect(() => {
    setTranslateX(selected === 'day' ? 0 : 100);
  }, [selected]);

  const handleChange = (value: string) => {
    setSelected(value);
    onTimeChange(value);
  };

  return (
    <div className='relative h-[30px] rounded-[15px] bg-gray-700/50'>
      <div className='relative flex h-full'>
        <div
          className={`
            absolute h-[30px] w-[100px] rounded-[15px]
            bg-gradient-to-r from-[#3e4c51] to-[#3d3737]
            transition-transform duration-400 ease-[cubic-bezier(0.88,-0.35,0.565,1.35)]
          `}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        />

        <button
          onClick={() => handleChange('day')}
          className='relative z-10 flex h-full w-[100px] cursor-pointer items-center justify-center text-sm sm:text-md text-white transition-colors duration-300'
        >
          Today
        </button>
        <button
          onClick={() => handleChange('week')}
          className='relative z-10 flex h-full w-[100px] cursor-pointer items-center justify-center text-sm sm:text-md text-white transition-colors duration-300'
        >
          This Week
        </button>
      </div>
    </div>
  );
};

export default TrendingToggle;
