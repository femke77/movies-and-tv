import { useParams, useNavigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import SeasonNavigation from '../../components/buttons/SeasonNavigation';
import { isIphoneSafari } from '../../utils/helpers';
import EpisodeList from '../../components/EpisodeList';

// TODO look into the flash of rerending when the api fetches the next season.
// FIXME This needs to be more componentized
// FIXME url params controlled ???? instead of state controlled would reduce props drilling which is currently at my maximum allowed depth of 2 & overall make the code cleaner with less state management

const WatchTV = () => {
  const { servers } = serverData;
  const { series_id } = useParams<{ series_id: string }>();
  const [selectedServer, setSelectedServer] = useState(() => {
    const lastSelectedServer = sessionStorage.getItem('lastSelectedServer');
    return lastSelectedServer || servers[0].value;
  });
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [currentSeasonLength, setCurrentSeasonLength] = useState(0);
  const [previousSeasonLength, setPreviousSeasonLength] = useState(0);
  const [serverURL, setServerURL] = useState('');

  const navigate = useNavigate();

  const { data: series } = useWatchDetails('tv', series_id ?? '');
  const { data: episodes } = useTVSeasonEpisodes(
    series_id ?? '',
    String(selectedSeason),
  );

  useEffect(() => {
    if (episodes) {
      // Shift previous season length when moving to a new season
      setPreviousSeasonLength(currentSeasonLength);
      setCurrentSeasonLength(episodes?.episodes?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason, episodes]);

  useEffect(() => {
    if (selectedSeason === 1 && selectedEpisode === 1) return;
    navigate(`/watch/tv/${series_id}/${selectedSeason}/${selectedEpisode}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeason, selectedEpisode]);

  useEffect(() => {
    switch (selectedServer) {
      case 'vidsrc.xyz':
        setServerURL(`https://vidsrc.xyz/embed/tv/${series_id}/${selectedSeason}-${selectedEpisode}`);
        break;
      case 'videasy.net':
        setServerURL(`https://player.videasy.net/tv/${series_id}/${selectedSeason}/${selectedEpisode}`);
        break;
    }

    sessionStorage.setItem('lastSelectedServer', selectedServer);
  }, [selectedServer, series_id]);

  return (
    <div className='min-h-screen pt-[60px]'>
      <div className='flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto'>
        <div className='primary flex-1 w-full lg:max-w-[calc(100%-424px)]'>
          <div className='flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]'>
            <div>
              <BackButton />
            </div>
            {series && (
              <p
                className='font-bold truncate text-ellipsis mx-6'
                title={series.original_name}
              >
                {series.original_name || ''}
              </p>
            )}

            <div className={`${isIphoneSafari() ? 'invisible' : ''}`}>
              <FullscreenBtn elementId='video-player' />
            </div>
          </div>
          <main>
            <div
              id='video-player'
              className='relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]'
            >
              <iframe
                id='player_iframe'
                className='absolute top-0 left-0 w-full h-full '
                width='100%'
                height='100%'
                // sandbox="allow-scripts allow-same-origin"
                // src={`/api/video/tv/${series_id}/${selectedSeason}/${selectedEpisode}`}

                src={serverURL}
                allowFullScreen
              ></iframe>
            </div>
            {series && (
              <div className='rounded-lg flex items-center justify-between gap-[16px] -my-[12px] p-[16px] bg-[#1f1f1f]'>
                {/* player controls (for tv) */}
                <div className='flex flex-col gap-2 w-full py-2'>
                  <div className='flex justify-center  sm:justify-between items-center flex-wrap'>
                    <div className='text-[#fff9] flex  mx-5 sm:mx-0'>
                      <div className='flex flex-col sm:flex-row'>
                        <span className='text-white ml-3'>
                          Season {selectedSeason} &#x2022; Episode{' '}
                          {selectedEpisode}
                        </span>
                        {episodes && (
                          <span className='ml-3 text-center'>
                            {episodes?.episodes?.[selectedEpisode - 1]?.name}
                          </span>
                        )}
                      </div>
                    </div>
                    {episodes && (
                      <div className='flex gap-2 my-3 mx-5 sm:mx-0'>
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
                  <hr className='h-0.5 w-full bg-gray-800/30 text-white' />
                </div>
              </div>
            )}

            <div className='rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px]'>
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
        <div className=' lg:w-[400px] lg:flex-shrink-0'>
          <div className='sidebar bg-[#1f1f1f] max-h-[900px] flex flex-col  rounded-lg'>
            <div className='sidebar-header border-b-[1px] border-[#2f2f2f] p-[16px]'>
              <div className='server-selection mb-[16px]'>
                {/* server selection */}
                <ListBoxComp
                  title={
                    <div className='flex items-center'>
                      <Settings size={20} className='mr-4' color='#ffffff' />
                      <p>Change Server</p>
                    </div>
                  }
                  selectedOption={selectedServer}
                  setSelectedOption={setSelectedServer}
                  availableOptions={servers}
                />
              </div>
              <div className='season-nav mb-[16px]'>
                {/* season nav here */}
                <SeasonNavigation
                  selectedSeason={selectedSeason}
                  setSelectedSeason={setSelectedSeason}
                  numSeasons={series?.number_of_seasons}
                  setSelectedEpisode={setSelectedEpisode}
                />
              </div>
            </div>
            <div className='episode-list'>
              {/* episode list here */}
              {episodes && (
                <EpisodeList
                  episodes={episodes?.episodes}
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
