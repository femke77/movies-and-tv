// import {
//   useTVSeasonEpisodes,
//   useWatchDetails,
// } from '../hooks/useItemOrWatchDetail';
import { useParams } from "react-router-dom";
import {
  useWatchDetails,
  useTVSeasonEpisodes,
} from "../../hooks/useItemOrWatchDetail";
import WatchDescription from "../../components/WatchDescription";
import BackButton from "../../components/BackBtn";
import FullscreenBtn from "../../components/FullScreenBtn";
import WatchPrevBtn from "../../components/WatchPrevBtn";
import WatchNextBtn from "../../components/WatchNextBtn";
import ListBoxComp from "../../components/ListBox";
import serverData from "../../utils/data/servers.json";
import { useState } from "react";
import { Settings } from "lucide-react";
import SeasonNavigation from "../../components/SeasonNavigation";

const WatchTV = () => {
  const { servers } = serverData;
  const { series_id } = useParams<{ series_id: string }>();
  const [selectedServer, setSelectedServer] = useState(servers[0].name);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  const { data: series } = useWatchDetails("tv", series_id ?? "");
  const { data: episodes } = useTVSeasonEpisodes(
    series_id ?? "",
    String(selectedSeason)
  );

  console.log(series);
  console.log(episodes);
  console.log("selected Episode",selectedEpisode);
  console.log("selected Season",selectedSeason);
  

  return (
    <div className="min-h-screen page pt-[60px]">
      <div className="flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto">
        <div className="primary flex-1 w-full lg:max-w-[calc(100%-424px)]">
          <header className="flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]">
            <div>
              <BackButton />
            </div>
            {series && (
              <p
                className="font-bold truncate text-ellipsis mx-6"
                title={series.original_name}
              >
                {series.original_name || ""}
              </p>
            )}

            <div>
              <FullscreenBtn elementId="video-player" />
            </div>
          </header>
          <main>
            <div
              id="video-player"
              className="relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]"
            >
              {/* <iframe
                  className="absolute top-0 left-0 w-full h-full "
                  width="100%"
                  height="100%"
                  src={`https://vidsrc.xyz/embed/series/${series_id}`}
                  allowFullScreen
                ></iframe> */}
            </div>
            {series && (
              <div className="rounded-lg flex items-center justify-between gap-[16px] -my-[12px] p-[16px] bg-[#1f1f1f]">
                {/* player controls (for tv) */}
                <div className="flex flex-col gap-2 w-full py-2">
                  <div className="flex justify-center  sm:justify-between items-center flex-wrap">
                    <p className="text-[#fff9] flex mx-5 sm:mx-0">
                      Current:{" "}
                      <span className="text-white ml-3">
                        Season {selectedSeason} &#x2022; Episode{" "}
                        {selectedEpisode}
                      </span>
                    </p>
                    <div className="flex gap-2 my-3 mx-5 sm:mx-0">
                      <WatchPrevBtn
                        selectedEpisode={selectedEpisode}
                        setSelectedEpisode={setSelectedEpisode}
                        selectedSeason={selectedSeason}
                      />
                      <WatchNextBtn
                        selectedEpisode={selectedEpisode}
                        setSelectedEpisode={setSelectedEpisode}
                        selectedSeason={selectedSeason}
                        setSelectedSeason={setSelectedSeason}
                        numSeasons={series.number_of_seasons}
                        currentSeasonLength={episodes?.episodes?.length || 0} 
                      />
                    </div>
                  </div>
                  <hr className="h-0.5 w-full bg-gray-800/30 text-white" />
                </div>
              </div>
            )}

            <div className="rounded-lg bg-[#1f1f1f] border-[#2f2f2f] p-[24px] mb-[24px]">
              {/* description */}
              {series && (
                <WatchDescription
                  title={series.original_name}
                  rt={series.episodes?.[0].runtime}
                  date={series.first_air_date}
                  overview={series.episodes[0].overview}
                />
              )}
            </div>
          </main>
        </div>
        {/* Sidebar */}
        <div className="secondary w-[400px] flex-shrink-0">
          <div className="sidebar bg-[#1f1f1f] h-[calc(100vh-100px)] flex flex-col sticky top-[80px] rounded-lg">
            <div className="sidebar-header border-b-[1px] border-[#2f2f2f] p-[16px]">
              <div className="server-selection mb-[16px]">
                {/* server selection select here */}
                <ListBoxComp
                  title={
                    <div className="flex items-center">
                      <Settings size={20} className="mr-4" color="#ffffff" />
                      <p>Change Server</p>
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
                  numSeasons={series?.number_of_seasons || 0}
                />
              </div>
            </div>
            <div className="episode-list">{/* episode list here */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTV;
