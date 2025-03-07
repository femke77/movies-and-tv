import { useParams } from 'react-router-dom';
import { useWatchDetails } from '../../hooks/useItemOrWatchDetail';
import WatchDescription from '../../components/WatchDescription';
import BackButton from '../../components/BackBtn';
import FullscreenBtn from '../../components/FullScreenBtn';
import ServerList from '../../components/ServerButton';
import { isIphoneSafari, isSafariOnIPad } from '../../utils/helpers';

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useWatchDetails('movie', movie_id ?? '');


  return (
    <div className='min-h-screen  pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto'>
        <div className='primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div>
              <BackButton />
            </div>
            {movie && (
              <p
                className='font-bold truncate text-ellipsis mx-6'
                title={movie.title}
              >
                {movie.title || ''}
              </p>
            )}

            <div className={`${isIphoneSafari() || isSafariOnIPad() ? 'invisible' : ''}`}>     
              <FullscreenBtn elementId='iframe' />
            </div>
          </div>
          <main>
            <div
           
              className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]'
            >
              <iframe
                  id='iframe'
                  className="absolute top-0 left-0 w-full h-full "
                  width="100%"
                  height="100%"
                  src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
                  allowFullScreen
                ></iframe>
            </div>

            <div className='rounded-lg bg-[#1f1f1f]  border-[#2f2f2f] p-[24px] mb-[24px]'>
              {/* description */}
              {movie && (
                <WatchDescription
                  title={movie?.title}
                  rt={movie?.runtime}
                  date={movie?.release_date}
                  overview={movie?.overview || 'No summary available'}
                />
              )}
            </div>
          </main>
        </div>
        <div className='secondary lg:w-[400px] lg:flex-shrink-0 '>
          {/* right side with server choices and episodes for tv*/}
          <div className='sidebar bg-[#1f1f1f] max-h-[800px] flex flex-col  rounded-lg'>
            <ServerList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
