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
import ListBoxComp from '../../components/ListBox';
import serverData from '../../utils/data/servers.json';
import { useEffect, useState, useRef } from 'react';
import { Settings } from 'lucide-react';
import SeasonNavigation from '../../components/buttons/SeasonNavigation';
import { isIphoneSafari } from '../../utils/helpers';
import EpisodeList from '../../components/EpisodeList';
import dayjs from 'dayjs';

// FIXME This needs to be more componentized. iframe at least needs it's own component.
// FIXME url params controlled instead of state controlled ??? would reduce props drilling which is currently at my maximum allowed depth of 2 & overall make the code cleaner with less state management. Thinking about this.
// FIXME active server on listboxcomp should be name not value.

const WatchTV = () => {
  const { servers } = serverData;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { series_id } = useParams<{ series_id: string }>();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServer, setSelectedServer] = useState(() => {
    const lastSelectedServer = localStorage.getItem('lastSelectedServer');
    return lastSelectedServer || servers[3].value;
  });
  const [selectedSeason, setSelectedSeason] = useState(() => {
    const lastSelectedSeason = localStorage.getItem(
      `lastSelectedSeason-${series_id}`
    );
    if (lastSelectedSeason) return Number(lastSelectedSeason);
    return 1;
  });
  const [selectedEpisode, setSelectedEpisode] = useState(() => {
    const lastSelectedEpisode = localStorage.getItem(
      `lastSelectedEpisode-${series_id}`
    );
    if (lastSelectedEpisode) return Number(lastSelectedEpisode);
    return 1;
  });
  const [currentSeasonLength, setCurrentSeasonLength] = useState(0);
  const [previousSeasonLength, setPreviousSeasonLength] = useState(0);
  
  const prevServerRef = useRef(selectedServer);
  
  const { data: series } = useWatchDetails('tv', series_id ?? '');
  console.log(series);
  
  const { data: episodes } = useTVSeasonEpisodes(
    series_id ?? '',
    String(selectedSeason)
  );

 useEffect(() => {

    if (!series) return;
    
    const continueWatching = localStorage.getItem('continueWatching');
    const watchData = continueWatching ? JSON.parse(continueWatching) : {};
    
    const newWatchData = {
      ...watchData,
      [series_id!]: {
        lastUpdated: dayjs().unix(),
        name: series.original_name ,
        posterPath: series.poster_path,
        media_type: 'tv',
        id: Number(series_id),
        season: selectedSeason,
        episode: selectedEpisode,
      },
    };
    
    localStorage.setItem('continueWatching', JSON.stringify(newWatchData));
  }, [series_id, series, selectedSeason, selectedEpisode]);
    

  useEffect(() => {
    if (episodes) {
      // Shift previous season length when moving to a new season
      setPreviousSeasonLength(currentSeasonLength);
      setCurrentSeasonLength(episodes?.episodes?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason, episodes]);

  useEffect(() => {
    const lastSeason = localStorage.getItem(
      `lastSelectedSeason-${series_id}`
    );
    if (lastSeason) {
      localStorage.removeItem(`lastSelectedSeason-${series_id}`);
      localStorage.setItem(
        `lastSelectedSeason-${series_id}`,
        String(selectedSeason)
      );
    } else {
      localStorage.setItem(
        `lastSelectedSeason-${series_id}`,
        String(selectedSeason)
      );
    }

    const lastEpisode = localStorage.getItem(
      `lastSelectedEpisode-${series_id}`
    );
    if (lastEpisode) {
      localStorage.removeItem(`lastSelectedEpisode-${series_id}`);
      localStorage.setItem(
        `lastSelectedEpisode-${series_id}`,
        String(selectedEpisode)
      );
    } else {
      localStorage.setItem(
        `lastSelectedEpisode-${series_id}`,
        String(selectedEpisode)
      );
    }
  }, [series_id, selectedSeason, selectedEpisode]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let newURL = '';
    switch (selectedServer) {
      case 'vidsrc.xyz':
        newURL = `https://vidsrc.xyz/embed/tv/${series_id}/${selectedSeason}-${selectedEpisode}`;
        break;
      case 'videasy.net':
        newURL = `https://player.videasy.net/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'vidlink.pro':
        newURL = `https://vidlink.pro/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      case 'vidbinge.dev':
        newURL = `https://vidbinge.dev/embed/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
        break;
      default:
        newURL = `https://vidbinge.dev/embed/tv/${series_id}/${selectedSeason}/${selectedEpisode}`;
    }

    const serverChanged = prevServerRef.current !== selectedServer;
    prevServerRef.current = selectedServer;

    if (serverChanged) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setIsLoading(true);

      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
      }

      setTimeout(() => {
        iframeRef.current?.contentWindow?.location.replace(newURL);
        timeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }, 300);

      localStorage.setItem('lastSelectedServer', selectedServer);
    } else {
      iframeRef.current?.contentWindow?.location.replace(newURL);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedServer, series_id, selectedSeason, selectedEpisode]);

  return (
    <div className="min-h-screen pt-[60px]">
      <div className="flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto">
        <div className="primary flex-1 w-full lg:max-w-[calc(100%-424px)]">
          <div className="flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]">
            <div>
              <BackButton url={`/tv/${series_id}`} />
            </div>
            {series && (
              <p
                className="font-bold truncate text-ellipsis mx-6"
                title={series.original_name}
              >
                {series.original_name || ''}
              </p>
            )}

            <div className={`${isIphoneSafari() ? 'invisible' : ''}`}>
              <FullscreenBtn elementId="video-player" />
            </div>
          </div>
          <main>
            <div
              id="video-player"
              className="relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]"
            >
              <iframe
                ref={iframeRef}
                id="player_iframe"
                className="absolute top-0 left-0 w-full h-full bg-black"
                width="100%"
                height="100%"
                // sandbox="allow-scripts allow-same-origin"
                // src={`/api/video/tv/${series_id}/${selectedSeason}/${selectedEpisode}`}
                allow="encrypted-media"
                src={'about:blank'}
                allowFullScreen
              ></iframe>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
                  <div className="text-white text-center">
                    <div className="inline-block w-8 h-8 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-2"></div>
                    <p>Loading {selectedServer}... </p>
                  </div>
                </div>
              )}
            </div>
            {series && (
              <div className="rounded-lg flex items-center justify-between gap-[16px] -my-[12px] p-[16px] bg-[#1f1f1f]">
                {/* player controls (for tv) */}
                <div className="flex flex-col gap-2 w-full py-2">
                  <div className="flex justify-center  sm:justify-between items-center flex-wrap">
                    <div className="text-[#fff9] flex  mx-5 sm:mx-0">
                      <div className="flex flex-col sm:flex-row">
                        <span className="text-white ml-3">
                          Season {selectedSeason} &#x2022; Episode{' '}
                          {selectedEpisode}
                        </span>
                        {episodes && (
                          <span className="ml-3 text-center">
                            {episodes?.episodes?.[selectedEpisode - 1]?.name}
                          </span>
                        )}
                      </div>
                    </div>
                    {episodes && (
                      <div className="flex gap-2 my-3 mx-5 sm:mx-0 min-h-[30px]">
                        <WatchPrevBtn
                          selectedEpisode={selectedEpisode}
                          setSelectedEpisode={setSelectedEpisode}
                          selectedSeason={selectedSeason}
                          setSelectedSeason={setSelectedSeason}
                          previousSeasonLength={previousSeasonLength}
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
                    )}
                  </div>
                  <hr className="h-0.5 w-full bg-gray-800/30 text-white" />
                </div>
              </div>
            )}

            <div className="rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px]">
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
        {/* Sidebar */}
        <div className=" lg:w-[400px] lg:flex-shrink-0">
          <div className="sidebar bg-[#1f1f1f] max-h-[900px] flex flex-col  rounded-lg">
            <div className="sidebar-header border-b-[1px] border-[#2f2f2f] p-[16px]">
              <div className="server-selection mb-[16px]">
                {/* server selection */}
                <ListBoxComp
                  title={
                    <div className="flex items-center">
                      <Settings size={20} className="mr-4" color="#ffffff" />
                      <div className="flex justify-between w-full">
                        <p>Change Server</p>
                        <p className="text-white/70 text-sm ml-9 truncate text-ellipsis">
                          {selectedServer}
                        </p>
                      </div>
                    </div>
                  }
                  selectedOption={selectedServer}
                  setSelectedOption={setSelectedServer}
                  availableOptions={servers}
                />
              </div>
              <div className="season-nav mb-[16px]">
                {/* season nav here */}
                <SeasonNavigation
                  selectedSeason={selectedSeason}
                  setSelectedSeason={setSelectedSeason}
                  numSeasons={series?.number_of_seasons}
                  setSelectedEpisode={setSelectedEpisode}
                />
              </div>
            </div>
            <div className="episode-list">
              {/* episode list here */}
              {episodes && (
                <EpisodeList
                  episodes={episodes?.episodes}
                  selectedSeason={selectedSeason}
                  selectedEpisode={selectedEpisode}
                  setSelectedEpisode={setSelectedEpisode}
                  setSelectedSeason={setSelectedSeason}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTV;
