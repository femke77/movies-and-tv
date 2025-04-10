import dayjs from 'dayjs';
import { useState } from 'react';

const WatchDescription = ({
  title,
  rt,
  date,
  overview,
}: {
  title?: string;
  rt?: string;
  date?: string;
  overview?: string;
}) => {
  const [open, setOpen] = useState(false);

  const getTextLength = () => {
    return overview && overview?.length > 200;
  };

  return (
    <div className='mt-2'>
      <h1 className='text-xl mb-2'>{title || ''}</h1>
      <div className='flex items-center text-[#fff9] text-sm'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#fff9'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-calendar-fold'
          >
            <path d='M8 2v4' />
            <path d='M16 2v4' />
            <path d='M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z' />
            <path d='M3 10h18' />
            <path d='M15 22v-4a2 2 0 0 1 2-2h4' />
          </svg>
          <p className='ml-2 mr-4'>
            {dayjs(date).format('MMM DD, YYYY') || ''}
          </p>
        </div>

        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#fff9'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-clock-3'
          >
            <circle cx='12' cy='12' r='10' />
            <polyline points='12 6 12 12 16.5 12' />
          </svg>
          <p className='ml-2'>{rt || 'unk'} min</p>
        </div>
      </div>
      {getTextLength() ? (
        <div
          className={`my-2  ${open ? 'h-fit' : 'h-42 sm:h-16 md:h-14 lg:h-fit'} `}
        >
          {`${open ? overview : overview?.slice(0, 200)}` || ''}

          <span
            className={`inline-block text-[#fff9] cursor-pointer `}
            onClick={() => setOpen(!open)}
          >
            {open ? <p className='ml-1'>Show less</p> : '...Show more'}
          </span>
        </div>
      ) : (
        <div className={`my-2 h-42 sm:h-16 md:h-14 lg:h-fit`}>
          {overview || ''}
        </div>
      )}
    </div>
  );
};
export default WatchDescription;
