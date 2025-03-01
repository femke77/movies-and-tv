import { useEffect, useState } from "react";
import Chip from "../components/Chip";
import { useItemDetail } from "../hooks/useItemDetail";
import { useParams } from "react-router-dom";
import UserRating from "../components/UserRating";
import WatchButton from "../components/WatchButton";
import { getStrokeColor } from "../utils/helpers";
import { CastList } from "../components/CastList";
import dayjs from "dayjs";

const ItemDetail = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lowResPosterLoaded, setLowResPosterLoaded] = useState(false);
  const [highResPosterLoaded, setHighResPosterLoaded] = useState(false);
  const { type, id } = useParams<{ type: string; id: string }>();
  const { data: item } = useItemDetail(type!, id!);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  if (!item) return null;

  const hiResPosterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w780${item.poster_path}`
    : "/no_poster_available.svg";
  const loResPosterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
    : "/no_poster_available.svg";

  const releaseYearMovie = item?.release_date?.split("-")[0];
  const releaseYearTV = item?.first_air_date?.split("-")[0];

  const strokeColor = getStrokeColor(item.vote_average);
  const directorData = item?.crew?.find(
    (member: { job: string }) => member.job === "Director"
  );
  const directorName = directorData?.name || "Unknown";
  const writerData = item?.crew?.find(
    (member: { job: string }) =>
      member.job === "Screenplay" || member.job === "Writer"
  );
  const writerName = writerData?.name || "Unknown";
  const calculateROI =
    item.revenue && item.budget
      ? (((item.revenue - item.budget) / item.budget) * 100).toFixed(1)
      : "0";
  const ROI =
    calculateROI === "Infinity" || calculateROI === "-Infinity"
      ? "0"
      : calculateROI;

  return (
    <>
      {item ? (
        <section id="item-detail" className="max-w-[1800px] relative flex flex-wrap pt-30 justify-center mx-auto px-4">
          <div
            className={`fixed inset-0 bg-cover bg-center blur-[5px] z-0 bg-no-repeat transition-opacity duration-1500 ease-in-out ${
              isVisible ? "opacity-40" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/w342${item?.backdrop_path}')`,
            }}
          ></div>
          {/* content */}
          <div className="relative z-10 w-full flex flex-wrap ">
            {/* Left Section */}
            <div className="relative  md:w-[320px] h-auto mb-12 flex flex-wrap mx-auto md:ml-3">
            <section className='w-[310px] sm:w-[450px]  md:w-[320px] flex-shrink-0 '>
  <div className="relative md:w-[340px] h-auto mb-12 mx-auto"> {/* Parent container with relative positioning */}
    <div className="absolute inset-0 ml-2">
      <img
        src={loResPosterPath}
        alt={`official poster for ${item.title || item.name}`}
        className={`w-full h-auto rounded-lg transition-opacity duration-100 ease-in-out blur-[10px] ${lowResPosterLoaded && !highResPosterLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLowResPosterLoaded(true)}
      />
    </div>
    <div className="absolute inset-0">
      <img
        src={hiResPosterPath}
        alt={`official poster for ${item.title || item.name}`}
        className={`w-full h-auto rounded-lg transition-opacity duration-300 ease-in-out ${highResPosterLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setHighResPosterLoaded(true)}
      />
    </div>
    {/* Invisible spacer to maintain correct height */}
    <img 
      src={hiResPosterPath} 
      alt="" 
      className="opacity-0 w-full h-auto pointer-events-none" 
      aria-hidden="true"
    />
  </div>
</section>
            </div>
            {/* Right Section */}
            <section className="mr-4 flex-grow md:max-h-[525px] basis-full md:basis-1/2 ml-2 pl-10 pr-6 overflow-auto flex flex-col items-center md:items-start  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-700 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 ">
              <h2 className="text-4xl mb-4 font-bold md:pr-16 text-center md:text-left">
                {item.title || item.name} ({releaseYearMovie || releaseYearTV})
              </h2>
              <p className="text-center md:text-left italic text-gray-200/50 text-light text-xl mb-3">
                {item.tagline}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start space-y-2 mb-4">
                {item.genres.map((genre: { id: string; name: string }) => (
                  <Chip key={genre.id} label={genre.name} />
                ))}
              </div>
              <p className="text-lg text-light">
                Rating:{" "}
                <span className="text-xl text-gray-200/70 my-3 font-bold">
                  {item.rating}
                </span>
              </p>
              <div className="flex items-center  mb-4 md:mb-0">
                <UserRating
                  rating={item.vote_average}
                  width="w-20"
                  height="h-20"
                  color={strokeColor}
                />
                <div className="pl-6 h-20 sm:pl-8 pt-4">
                  <WatchButton />
                </div>
              </div>

              <h3 className="text-3xl font-bold mt-4 text-center md:text-left">
                Overview
              </h3>
              {/* put min width 400 if you want the y-axis too */}
              <p className="text-lg text-center md:text-left text-white/60  my-3 mb-6 font-bold">
                {item.overview}
              </p>

              <div className="flex flex-wrap md:flex-nowrap space-x-10 mb-4">
                <p className="text-xl font-bold">
                  Status:{" "}
                  <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                    {item.status}
                  </span>
                </p>
                <p className="text-xl font-bold">
                  Release Date:{" "}
                  <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                    {(item.release_date &&
                      dayjs(item.release_date).format("MMM DD, YYYY")) ||
                      (item.first_air_date &&
                        dayjs(item.first_air_date).format("MMM DD, YYYY"))}
                  </span>
                </p>
                <p className="text-xl font-bold">
                  Runtime:{" "}
                  <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                    {item.runtime
                      ? `${item.runtime} min`
                      : item.episode_run_time?.[0]
                      ? `${item.episode_run_time[0]} min`
                      : "Unknown"}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap md:flex-nowrap md:justify-center space-x-10 mb-4">
                {item.budget > 0 && (
                  <p className="text-xl font-bold">
                    Budget:{" "}
                    <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                      {item.budget.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </p>
                )}
                {item.revenue > 0 && (
                  <p className="text-xl font-bold">
                    Revenue:{" "}
                    <span className="text-lg text-gray-100/50 my-3 ml-1 font-bold">
                      {item.revenue.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </p>
                )}
                {ROI !== "0" && (
                  <p className="text-xl font-bold">
                    ROI:{" "}
                    <span className="text-lg text-gray-100/50 my-3 ml-1 font-bold">
                      {ROI}%
                    </span>
                  </p>
                )}
              </div>
              <div className="flex md:flex-col flex-wrap  space-x-10 mb-4">
                <p className="text-xl font-bold mb-4">
                  Director:{" "}
                  <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                    {directorName}
                  </span>
                </p>
                <p className="text-xl mb-8 font-bold">
                  Writer:{" "}
                  <span className="text-lg text-gray-100/50 my-3 font-bold ml-1">
                    {writerName}
                  </span>
                </p>
              </div>
            </section>

            {/* Cast Section */}
            {item.cast?.length > 0 && (
              <section className="w-full mt-30">
                <h3 className="text-2xl/14 text-white/70  text-center">
                  Top Cast
                </h3>
                <div className="flex flex-wrap gap-4">
                  <CastList cast={item.cast} />
                </div>
              </section>
            )}
          </div>
        </section>
      ) : (
        <p>No Movie Found 😔</p>
      )}
    </>
  );
};
export default ItemDetail;
