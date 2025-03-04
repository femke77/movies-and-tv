import { useParams } from "react-router-dom";
import { useWatchDetails } from "../../hooks/useItemOrWatchDetail";
import WatchDescription from "../../components/WatchDescription";
import BackButton from "../../components/BackBtn";
import FullscreenBtn from "../../components/FullScreenBtn";

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useWatchDetails("movie", movie_id ?? "");
  // console.log(movie);

  const goFullScreen = (element: HTMLElement | null) => {
    if (element) {
      (element as HTMLElement).requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    }
  };

  return (
    <div className="min-h-screen page pt-[60px]">
      <div className="flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto">
        <div className="primary flex-1 w-full lg:max-w-[calc(100%-424px)]">
          <header className="flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]">
            <div>
              <BackButton />
            </div>
            {movie && <p className="font-bold">{movie.title}</p>}

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
                  src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
                  allowFullScreen
                ></iframe> */}
            </div>

            {/* <div className="rounded-lg flex align-center justify-between gap-[16px] -my-[12px] p-[16px] bg-[#1f1f1f]"> */}
            {/* player controls (for tv) */}

            {/* <hr className="h-0.5 w-full bg-gray-800/30 text-white" /> */}
            {/* </div> */}
            <div className="rounded-lg bg-[#1f1f1f]  border-[#2f2f2f] p-[24px] mb-[24px]">
              {/* description */}
              {movie && (
                <WatchDescription
                  title={movie.title}
                  rt={movie.runtime}
                  date={movie.release_date}
                  overview={movie.overview}
                />
              )}
            </div>
          </main>
        </div>
        <div className="secondary ">
          {/* right side with server choices and episodes for tv*/}
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
