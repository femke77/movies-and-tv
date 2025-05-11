import { useParams } from 'react-router-dom';
import {
  useWatchDetails,
  useTVSeasonEpisodes,
} from '../../hooks/useItemOrWatchDetail';
import WatchDescription from '../../components/WatchDescription';
import BackButton from '../../components/buttons/BackBtn';
import FullscreenBtn from '../../components/buttons/FullScreenBtn';
import WatchPrevBtn from '../../components/buttons/WatchPrevBtn';
import WatchNextBtn from '../../components/buttons/WatchNextBtn';
import ListBoxComp from '../../components/selectors/ListBox';
import serverData from '../../utils/data/servers.json';
import { useEffect, useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import SeasonNavigation from '../../components/buttons/SeasonNavigation';
import { isIPad, isIphoneSafari } from '../../utils/helpers';
import EpisodeList from '../../components/lists/EpisodeList';
import dayjs from 'dayjs';
import useDocumentTitle from '../../hooks/usePageTitles';
import { useStore } from '../../state/store';

const WatchTV = () => {
  const VIEWING_PROGRESS_LIMIT = 250;
  const { servers } = serverData;
  const { addToContinueWatchingTv } = useStore();

  const historyRef = useRef<number>(window.history.length);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iframeLoadRef = useRef<NodeJS.Timeout | null>(null);
  const prevSeasonLengthRef = useRef<number>(0);

  const { series_id } = useParams<{ series_id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const [selectedServer, setSelectedServer] = useState(() => {
    const lastSelectedServer = localStorage.getItem('lastSelectedServer');
    return lastSelectedServer || servers[0].value;
  });

  const [viewProgress] = useState(() => {
    const viewProgressObj = localStorage.getItem(`viewing-progress`);
    if (viewProgressObj) {
      const items = JSON.parse(viewProgressObj);
      const progressItem = items[`tv-${series_id}`];
      if (progressItem) {
        return {
          [`tv-${series_id}`]: {
            season: Number(progressItem.season),
            episode: Number(progressItem.episode),
            lastUpdated: Number(progressItem.lastUpdated),
          },
        };
      }
      return null;
    }
    return null;
  });

  const [selectedSeason, setSelectedSeason] = useState(() => {
    if (viewProgress) {
      const selectedSeason = viewProgress[`tv-${series_id}`]?.season;
      if (selectedSeason) {
        return Number(selectedSeason);
      }
      return 1;
    }
    return 1;
  });

  const [selectedEpisode, setSelectedEpisode] = useState(() => {
    if (viewProgress) {
      const selectedEpisode = viewProgress[`tv-${series_id}`]?.episode;
      if (selectedEpisode) {
        return Number(selectedEpisode);
      }
      return 1;
    }
    return 1;
  });

  const [currentSeasonLength, setCurrentSeasonLength] = useState(0);
  // const [previousSeasonLength, setPreviousSeasonLength] = useState(0);
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
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (interactionTimeoutRef.current) {
        // console.log('Clearing timeout...');
        clearTimeout(interactionTimeoutRef.current);
        interactionTimeoutRef.current = null;
      }
    };
  }, []);

  const prevServerRef = useRef(selectedServer);

  const { data: series } = useWatchDetails('tv', series_id!);
  const { data: episodes } = useTVSeasonEpisodes(
    series_id ?? '',
    String(selectedSeason),
  );

  useDocumentTitle(
    series?.original_name
      ? `Watch ${series?.original_name || 'TV Show'} | BingeBox`
      : 'Loading... | BingeBox',
  );

  useEffect(() => {
    if (!series) return;

    // add to continue watching list
    // setTimeout(() => {
    addToContinueWatchingTv(
      Number(series_id!),
      'tv',
      dayjs().unix(),
      series.original_name,
      selectedSeason,
      selectedEpisode,
      series.backdrop_path,
    );

    // }, 180000);

    // keep track of previous season length to shift when moving to a new season
    if (episodes) {
      // Shift previous season length when moving to a new season
      prevSeasonLengthRef.current = currentSeasonLength;
      setCurrentSeasonLength(episodes?.episodes?.length);
    }

    // update viewing progress in local storage
    const updatedViewProgressItem = {
      [`tv-${series_id}`]: {
        season: selectedSeason,
        episode: selectedEpisode,
        lastUpdated: dayjs().unix(),
      },
    };
    const viewProgressObj = localStorage.getItem(`viewing-progress`);
    if (viewProgressObj) {
      const viewProgress = JSON.parse(viewProgressObj);
      // keep a rotation of 250 tv series in local storage and remove the oldest in favor of the most recent
      if (Object.keys(viewProgress).length > VIEWING_PROGRESS_LIMIT) {
        const oldestKey = Object.keys(viewProgress).reduce((oldest, key) => {
          if (!viewProgress[oldest].lastUpdated) return key;
          if (!viewProgress[key].lastUpdated) return oldest;
          return viewProgress[key].lastUpdated <
            viewProgress[oldest].lastUpdated
            ? key
            : oldest;
        }, Object.keys(viewProgress)[0]);
        delete viewProgress[oldestKey];
      }
      const updatedViewProgress = {
        ...viewProgress,
        ...updatedViewProgressItem,
      };

      localStorage.setItem(
        `viewing-progress`,
        JSON.stringify(updatedViewProgress),
      );
    } else {
      localStorage.setItem(
        `viewing-progress`,
        JSON.stringify(updatedViewProgressItem),
      );
    }
  }, [series_id, series, selectedSeason, selectedEpisode]);

  // when page is remounted, user will see loading spinner for 750ms
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let newURL = '';
    switch (selectedServer) {
      case 'vidsrc.xyz':
        newURL = `https://vidsrc.net/embed/tv/${series_id}/${selectedSeason}-${selectedEpisode}`;
        break;
      case 'videasy.net':
        newURL = `https://player.videasy.net/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'vidlink.pro':
        newURL = `https://vidlink.pro/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'moviesapi.club':
        newURL = `https://moviesapi.club/tv/${series_id}-${selectedSeason}-${selectedEpisode}`;
        break;
      case 'embed.su':
        newURL = `https://embed.su/embed/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'nontongo.win':
        newURL = `https://www.nontongo.win/embed/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'vidsrc.wtf':
        newURL = `https://vidsrc.wtf/api/3/tv/?id=${series_id}&s=${selectedSeason}&e=${selectedEpisode}`;
        break;
      case 'vidsrc.wtf-ml':
        newURL = `https://vidsrc.wtf/api/2/tv/?id=${series_id}&s=${selectedSeason}&e=${selectedEpisode}`;
        break;
      case '111movies.com':
        newURL = `https://111movies.com/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'vidfast.pro':
        newURL = `https://vidfast.pro/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'superembed.stream':
        newURL = `https://multiembed.mov/directstream.php?video_id=${series_id}&tmdb=1&s=${selectedSeason}&e=${selectedEpisode}`;
        break;
    }

    const serverChanged = prevServerRef.current !== selectedServer;
    prevServerRef.current = selectedServer;

    if (serverChanged) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsLoading(true);

      if (iframeRef.current) {
        iframeRef.current.contentWindow?.location.replace('about:blank');
      }

      iframeLoadRef.current = setTimeout(() => {
        iframeRef.current?.contentWindow?.location.replace(newURL);
        // embed.su 404 causes extra history entry, this removes it.
        if (historyRef.current < window.history.length) {
          window.history.back();
        }
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 750);
      }, 300);

      localStorage.setItem('lastSelectedServer', selectedServer);
    } else {
      iframeRef.current?.contentWindow?.location.replace(newURL);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (iframeLoadRef.current) {
        clearTimeout(iframeLoadRef.current);
      }
    };
  }, [selectedServer, series_id, selectedSeason, selectedEpisode]);

  return (
    <div className='min-h-screen pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] mb-6 lg:mx-auto'>
        <div className='primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div>
              <BackButton color='text-white' />
            </div>
            {series && (
              <p
                className='font-bold truncate text-ellipsis mx-6'
                title={series.original_name}
              >
                {series.original_name || ''}
              </p>
            )}

            <div
              className={`${isIphoneSafari() || isIPad() ? 'invisible' : ''}`}
            >
              <FullscreenBtn elementId='iframe-tv' />
            </div>
          </div>
          <main>
            <div
              id='video-player'
              className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f] min-h-[300px]'
            >
              {/* {!unlocked && (
                //  overlay that absorbs 'bad' clicks based on cursor state
                <div className='overlay absolute inset-0 z-20 bg-transparent cursor-pointer'></div>
              )} */}
              <iframe
                ref={iframeRef}
                key={`${selectedServer}-${series_id}`}
                id='iframe-tv'
                className='absolute top-0 left-0 w-full h-full bg-black'
                width='100%'
                height='100%'
                // sandbox="allow-scripts allow-same-origin"
                // src={`/api/video/tv/${series_id}/${selectedSeason}/${selectedEpisode}`}
                allow='encrypted-media; autoplay;'
                src={'about:blank'}
                allowFullScreen
              ></iframe>
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
            {/* player controls (for tv) */}
            {series && (
              <div className='min-h-[100px] mb-1 rounded-lg flex items-center justify-between gap-[16px]  p-[16px] bg-[#1f1f1f]'>
                <div className='flex flex-col  w-full '>
                  <div className='flex justify-center sm:justify-between items-center flex-wrap'>
                    <div className='text-[#fff9] flex  mx-5 sm:mx-0'>
                      <div className='flex flex-col mt-[15px] sm:flex-row'>
                        <span className='text-white ml-3'>
                          Season {selectedSeason} &#x2022; Episode{' '}
                          {selectedEpisode}
                        </span>
                        {episodes ? (
                          <span className='ml-3 text-center min-h-[30px]'>
                            {episodes?.episodes?.[selectedEpisode - 1]?.name}
                          </span>
                        ) : (
                          <span className='ml-3 text-center min-h-[30px]'>
                            Loading...
                          </span>
                        )}
                      </div>
                    </div>
                    {/* next/prev episode buttons */}
                    {episodes ? (
                      <div className='min-h-[36px] flex gap-2 my-3 mt-5 mx-5 sm:mx-0 '>
                        <WatchPrevBtn
                          selectedEpisode={selectedEpisode}
                          setSelectedEpisode={setSelectedEpisode}
                          selectedSeason={selectedSeason}
                          setSelectedSeason={setSelectedSeason}
                          previousSeasonLength={prevSeasonLengthRef.current}
                        />
                        <WatchNextBtn
                          selectedEpisode={selectedEpisode}
                          setSelectedEpisode={setSelectedEpisode}
                          selectedSeason={selectedSeason}
                          setSelectedSeason={setSelectedSeason}
                          numSeasons={series.number_of_seasons}
                          currentSeasonLength={currentSeasonLength}
                        />
                      </div>
                    ) : (
                      <div className='min-h-[36px] flex gap-2 my-3 mt-5 mx-5 sm:mx-0'>
                        <button
                          className={`min-h-[36px] back-button flex hover:cursor-pointer p-2 px-4 mx-2 bg-gray-700/50 pr-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] `}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='lucide lucide-arrow-left'
                          >
                            <path d='m12 19-7-7 7-7'></path>
                            <path d='M19 12H5'></path>
                          </svg>
                          <p className='text-sm ml-1'> Prev</p>
                        </button>
                        <button
                          className={`next-button flex hover:cursor-pointer mx-2 bg-gray-700/50 p-2 px-4 pl-5 rounded-lg hover:bg-gray-700/70 hover:translate-[0.5px] active:translate-[0.5px] `}
                        >
                          <p className='text-sm mr-1'> Next</p>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#ffffff'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='lucide lucide-arrow-right'
                          >
                            <path d='M5 12h14' />
                            <path d='m12 5 7 7-7 7' />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <hr className='h-0.5 w-full bg-gray-800/30 text-white' />
                </div>
              </div>
            )}

            <div className='rounded-lg bg-[#1f1f1f] border-[#2f2f2f] px-[24px] py-3 mb-[24px]'>
              {/* description */}
              {series && (
                <WatchDescription
                  title={series?.original_name}
                  rt={episodes?.episodes?.[selectedEpisode - 1]?.runtime}
                  date={series?.first_air_date}
                  overview={episodes?.episodes?.[selectedEpisode - 1]?.overview}
                />
              )}
            </div>
          </main>
        </div>
        {/* sidebar */}
        <div className=' lg:w-[400px] lg:flex-shrink-0'>
          <div className='sidebar bg-[#1f1f1f] max-h-[900px] flex flex-col  rounded-lg'>
            <div className='sidebar-header border-b-[1px] border-[#2f2f2f] p-[16px]'>
              <div className='server-selection mb-8 sm:mb-10 md:mb-8 pt-1'>
                {/* server selection */}
                <ListBoxComp
                  title={
                    <div className='flex items-center'>
                      <Settings size={20} className='mr-4' color='#ffffff' />
                      <div className='flex justify-between items-center w-full'>
                        <p className='mr-2'>Change Server</p>
                        <p className='text-white/70 text-sm truncate text-ellipsis'>
                          {
                            servers.find(
                              (server) => server.value === selectedServer,
                            )?.name
                          }
                        </p>
                      </div>
                    </div>
                  }
                  selectedOption={selectedServer}
                  setSelectedOption={setSelectedServer}
                  availableOptions={servers}
                />
              </div>
              <div className='season-nav mb-[16px]'>
                {/* season nav buttons */}
                <SeasonNavigation
                  selectedSeason={selectedSeason}
                  setSelectedSeason={setSelectedSeason}
                  numSeasons={series?.number_of_seasons}
                  setSelectedEpisode={setSelectedEpisode}
                />
              </div>
            </div>
            <div>
              {/* episode list  */}
              {episodes ? (
                <EpisodeList
                  episodes={episodes?.episodes}
                  selectedSeason={selectedSeason}
                  selectedEpisode={selectedEpisode}
                  setSelectedEpisode={setSelectedEpisode}
                  setSelectedSeason={setSelectedSeason}
                />
              ) : (
                <div className='episode-list-placeholder h-[700px] p-[16px] mb-3 ' />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTV;
