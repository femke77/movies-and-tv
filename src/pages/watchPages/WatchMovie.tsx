import { useParams } from 'react-router-dom';
import { useWatchDetails } from '../../hooks/useItemOrWatchDetail';
import WatchDescription from '../../components/WatchDescription';
import BackButton from '../../components/buttons/BackBtn';
import FullscreenBtn from '../../components/buttons/FullScreenBtn';
import ServerList from '../../components/lists/ServerList';
import { isIphoneSafari, isIPad } from '../../utils/helpers';
import serverData from '../../utils/data/servers.json';
import { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import useDocumentTitle from '../../hooks/usePageTitles';
import { useStore } from '../../state/store';

const WatchMovie = () => {
  const { addToContinueWatchingMovie } = useStore();
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useWatchDetails('movie', movie_id ?? '');
  const { servers } = serverData;

  const historyRef = useRef<number>(window.history.length);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useDocumentTitle(
    movie?.title
      ? `Watch ${movie?.title || 'Movie'}  | BingeBox`
      : 'Loading... | BingeBox',
  );

  const [isLoading, setIsLoading] = useState(false);
  const [selectedServer, setSelectedServer] = useState(() => {
    const lastSelectedServer = localStorage.getItem('lastSelectedServer');
    return lastSelectedServer || servers[0].value;
  });

  const [unlocked, setUnlocked] = useState(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    const cursor = getComputedStyle(el).cursor;
    // cursor is arrow when clickjack overlay is on
    if (cursor === 'pointer' && !unlocked) {
      // console.log('Cursor is pointer. Unlocking iframe interaction.');

      setUnlocked(true);

      if (interactionTimeoutRef.current)
        clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = setTimeout(() => {
        setUnlocked(false);
        // console.log('Locking iframe interaction again.');
      }, 250); //unlock for 1/4 second
    }
  };

  // useEffect(() => {
  //   window.addEventListener('message', (event) => {
  //     if (event.data ) {
  //      console.log(event.data.message);
  //     }});

  //     return () => {
  //       window.removeEventListener('message', (event) => {
  //         if (event.data) {
  //           console.log(event.data);
  //         }
  //       });
  //     }
  //   }, [selectedServer]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (interactionTimeoutRef.current) {
        console.log('Clearing timeout...');
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!movie) return;
    // setTimeout(() => {
    addToContinueWatchingMovie(
      Number(movie_id),
      'movie',
      dayjs().unix(),
      movie.title,
      movie.backdrop_path,
      movie.release_date,
      movie.runtime,
    );
    // }, 180000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie_id, movie]);

  useEffect(() => {
    let newURL = '';
    switch (selectedServer) {
      case 'vidsrc.xyz':
        newURL = `https://vidsrc.net/embed/movie/${movie_id}`;
        break;
      case 'videasy.net':
        newURL = `https://player.videasy.net/movie/${movie_id}`;
        break;
      case 'vidlink.pro':
        newURL = `https://vidlink.pro/movie/${movie_id}`;
        break;
      case 'moviesapi.club':
        newURL = `https://moviesapi.club/movie/${movie_id}`;
        break;
      case 'embed.su':
        newURL = `https://embed.su/embed/movie/${movie_id}`;
        break;
      case 'nontongo.win':
        newURL = `https://www.nontongo.win/embed/movie/${movie_id}`;
        break;
      case 'vidsrc.wtf':
        newURL = `https://vidsrc.wtf/api/3/movie/?id=${movie_id}`;
        break;
      case 'vidsrc.wtf-ml':
        newURL = `https://vidsrc.wtf/api/2/movie/?id=${movie_id}`;
        break;
      case '111movies.com':
        newURL = ` https://111movies.com/movie/${movie_id}`;
        break;
      case 'vidfast.pro':
        newURL = `https://vidfast.pro/movie/${movie_id}`;
        break;
      case 'superembed.stream':
        newURL = ` https://multiembed.mov/directstream.php?video_id=${movie_id}&tmdb=1`;
        break;
      case 'vidsrc.xyz.safe':
        newURL = `https://bingebox-server-54dc60d03f7d.herokuapp.com/api/video/movie/${movie_id}`;
        break;
      case 'videasy.net.safe':
        newURL = `https://player.videasy.net/movie/${movie_id}`;
        break;
      case 'vidfast.pro.safe':
        newURL = `https://vidfast.pro/movie/${movie_id}`;
        break;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.location.replace('about:blank');
    }
    setTimeout(() => {
      iframeRef.current?.contentWindow?.location.replace(newURL);
      // embed.su 404 causes extra history entry
      if (historyRef.current < window.history.length) {
        window.history.back();
      }

      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 750);
    }, 300);

    localStorage.setItem('lastSelectedServer', selectedServer);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [selectedServer, movie_id]);

  return (
    <div className='min-h-screen pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto'>
        <div className='relative primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div>
              <BackButton color='text-white' />
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
            <div className={isIphoneSafari() || isIPad() ? 'invisible' : ''}>
              <FullscreenBtn elementId='iframe-movie' />
            </div>
          </div>
          <main>
            <div className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f] min-h-[300px]'>
              {selectedServer === 'vidsrc.xyz.safe' ||
              selectedServer === 'videasy.net.safe' ||
              selectedServer === 'vidfast.pro.safe' ? (
                <iframe
                  ref={iframeRef}
                  id='player_iframe'
                  className='absolute top-0 left-0 w-full h-full bg-black'
                  width='100%'
                  height='100%'
                  sandbox='allow-scripts allow-same-origin'
                  referrerPolicy='no-referrer'
                  allow='encrypted-media; autoplay;'
                  src={'about:blank'}
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  {/* {!unlocked && (
                    //  overlay that absorbs 'bad' clicks based on cursor state
                    <div className='overlay absolute inset-0 z-20 bg-transparent cursor-pointer'></div>
                  )} */}
                  <iframe
                    ref={iframeRef}
                    id='player_iframe'
                    className='absolute top-0 left-0 w-full h-full bg-black'
                    width='100%'
                    height='100%'
                    allow='encrypted-media; autoplay;'
                    src={'about:blank'}
                    allowFullScreen
                  ></iframe>
                </>
              )}
              {isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10'>
                  <div className='text-white text-center'>
                    <div className='inline-block w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-2'></div>
                    <p>
                      Loading{' '}
                      {
                        servers.find(
                          (server) => server.value === selectedServer,
                        )?.name
                      }
                      ...{' '}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* description */}
            <div className='rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px]'>
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
          <div className='sidebar bg-[#1f1f1f] max-h-[900px] flex flex-col rounded-lg'>
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
