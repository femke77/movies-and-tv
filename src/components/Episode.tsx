import { IEpisode } from "../interfaces/IEpisode";
import dayjs from "dayjs";

const Episode = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className="flex text-[12px] bg-[#1f1f1f]  rounded-lg p-2 w-full border border-[#303030]">
      <div className="w-[160px] h-[90px] relative overflow-hidden rounded-lg ml-3">
      <img
        src={`https://image.tmdb.org/t/p/w300${episode?.still_path}`}
        alt={episode?.name}
        className="h-full w-full object-cover"
      /></div>
      <div className="flex flex-col min-w-0 px-4 w-1/2">
        <h1 className="text-white text-[14px] pb-1">{episode?.name}</h1>
        <p className="text-gray-400 line-clamp-2 text-ellipsis">{episode?.overview}</p>
        <div className="flex gap-2 mt-2">
          <p className="text-gray-400">{episode?.runtime} min</p> &#x2022;
          <p className="text-gray-400">
            {dayjs(episode?.air_date).format("MMM D, YYYY")} 
          </p>
        </div>
      </div>
    </div>
  );
};
export default Episode;
