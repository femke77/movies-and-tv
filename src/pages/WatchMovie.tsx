import { useParams } from "react-router-dom";
import { useWatchDetails } from "../hooks/useItemOrWatchDetail";
import WatchDescription from "../components/WatchDescription";

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  const { data: movie } = useWatchDetails("movie", movie_id ?? "");

  return (
    <div className="min-h-screen page pt-[60px]">
      <div className="mt-24 flex flex-col lg:flex-row lg:gap-[24px] p-[16px]lg:p-[24px] lg:max-w-[2200px] lg:mx-auto">
        <div className="primary flex-1 w-full lg:max-w-[calc(100%-424px)]">
          <header>
            <main>
              <div className="relative pt-[56.25%]  w-full overflow-hidden mb-[24px] rounded-lg">
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
              </div>
              <div className="rounded-lg bg-[#1f1f1f]  border-[#2f2f2f] p-[24px] mb-[24px]">
                {/* description */}
              </div>
            </main>
          </header>
        </div>
        <div className="secondary ">
          {/* right side */}
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
