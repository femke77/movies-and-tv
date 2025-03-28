import dayjs from 'dayjs';
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
  return (
    <div className='h-[200px] sm:h-[200px] md:h-[10rem] '>
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
          <p className='ml-2'>{rt || '0'} min</p>
        </div>
      </div>
      <p className='my-2 line-clamp-4 lg:line-clamp-10'>{overview || ''}</p>
    </div>
  );
};
export default WatchDescription;
