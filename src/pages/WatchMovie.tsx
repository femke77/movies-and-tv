import { useParams } from "react-router-dom";
import { useWatchDetails } from "../hooks/useItemOrWatchDetail";
import WatchDescription from "../components/WatchDescription";

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useWatchDetails("movie", movie_id ?? "");
  // console.log(movie);

  const goFullScreen = (element: HTMLElement | null) => {  

    if (element) {
      (element as HTMLElement).requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    }
  };

  return (
    <div className="min-h-screen page pt-[60px]">
      <div className="flex flex-col lg:flex-row lg:gap-[24px] p-[16px] lg:p-[24px] lg:max-w-[2200px] lg:mx-auto">
        <div className="primary flex-1 w-full lg:max-w-[calc(100%-424px)]">
          <header className="flex items-center justify-between text-xl mb-[16px] rounded-lg bg-[#1f1f1f] py-[12px] px-[16px]">
            <div>
              <button
                className="back-button flex"
                onClick={() => history.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                <p className="text-sm ml-1"> Back</p>
              </button>
            </div>
            {movie && <p className="font-bold">{movie.title}</p>}

            <button className="w-[52px] pl-3" onClick={()=>goFullScreen(document.getElementById("video-player"))}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-maximize2"
              >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" x2="14" y1="3" y2="10"></line>
                <line x1="3" x2="10" y1="21" y2="14"></line>
              </svg>
            </button>
          </header>
          <main>
            <div id="video-player" className="relative pt-[56.25%] w-full overflow-hidden mb-[24px] rounded-lg bg-[#1f1f1f]">
              <iframe
                  className="absolute top-0 left-0 w-full h-full "
                  width="100%"
                  height="100%"
                  src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
                  allowFullScreen
                ></iframe>
            </div>

            <div className="rounded-lg flex align-center justify-between gap-[16px] -my-[12px] p-[16px] bg-[#1f1f1f]">
              {/* player controls */}

              <hr className="h-0.5 w-full bg-gray-800/30 text-white" />
            </div>
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
