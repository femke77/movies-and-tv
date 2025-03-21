import { useParams } from 'react-router-dom';
import { useWatchDetails } from '../../hooks/useItemOrWatchDetail';
import WatchDescription from '../../components/WatchDescription';
import BackButton from '../../components/buttons/BackBtn';
import FullscreenBtn from '../../components/buttons/FullScreenBtn';
import ServerList from '../../components/ServerList';
import { isIphoneSafari } from '../../utils/helpers';
import serverData from '../../utils/data/servers.json';
import { useEffect, useState, useRef } from 'react';

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie = {} } = useWatchDetails('movie', movie_id ?? '');
  const { servers } = serverData;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServer, setSelectedServer] = useState(() => {
    const lastSelectedServer = sessionStorage.getItem('lastSelectedServer');
    return lastSelectedServer || servers[0].value;
  });

  const [serverURL, setServerURL] = useState('');

  useEffect(() => {
    let newURL = '';
    switch (selectedServer) {
      case 'vidsrc.xyz':
        newURL = `https://vidsrc.xyz/embed/movie/${movie_id}`;
        break;
      case 'videasy.net':
        newURL = `https://player.videasy.net/movie/${movie_id}`;
        break;
      case 'vidlink.pro':
        newURL = `https://vidlink.pro/movie/${movie_id}`;
        break;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = 'about:blank';
    }
    setTimeout(() => {
      setServerURL(newURL);
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, 300);

    sessionStorage.setItem('lastSelectedServer', selectedServer);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedServer, movie_id]);

  return (
    <div className='min-h-screen pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto'>
        <div className='primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div>
              <BackButton url={`/movie/${movie_id}`} />
            </div>
            {movie && (
              <p
                className='font-bold truncate text-ellipsis mx-6'
                title={movie.title}
              >
                {movie.title || ''}
              </p>
            )}
            {/* iphone safari doesn't support the FS api */}
            <div className={`${isIphoneSafari() ? 'invisible' : ''}`}>
              <FullscreenBtn elementId='iframe' />
            </div>
          </div>
          <main>
            <div className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]'>
              <iframe
                ref={iframeRef}
                id='iframe'
                className='absolute top-0 left-0 w-full h-full bg-black'
                width='100%'
                height='100%'
                src={serverURL}
                allow='encrypted-media'
                allowFullScreen
              ></iframe>
              {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10'>
                  <div className='text-white text-center'>
                    <div className='inline-block w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-2'></div>
                    <p>Loading {selectedServer}... </p>
                  </div>
                </div>
              )}
            </div>

            <div className='rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px]'>
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
          <div className='sidebar bg-[#1f1f1f] max-h-[800px] flex flex-col rounded-lg'>
            <ServerList
              serverData={servers}
              selectedServer={selectedServer}
              setSelectedServer={setSelectedServer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
