import { IMovie } from "../interfaces/IMovie";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import UserRating from "./UserRating";
import { getStrokeColor } from "../utils/helpers";
import { useEffect, useState } from "react";

const ItemCard = ({
  item,
  itemType,
  showRating,
  showGenres,
  textSize,
}: {
  item: IMovie;
  itemType: string;
  showRating: boolean;
  showGenres: boolean;
  textSize: string;
}) => {
  const formattedReleaseDate = dayjs(item.release_date).format("MMM D, YYYY");
  const formattedAirDate = dayjs(item.first_air_date).format("MMM D, YYYY");
  const [isVisible, setIsVisible] = useState(false);
  const strokeColor = getStrokeColor(item.vote_average ?? 0);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <>
      <div
        className={`relative flex flex-col items-center justify-between w-full bg-black rounded-xl shadow-lg overflow-hidden 
        transition-opacity duration-500 ease-linear ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link to={`/${itemType}/${item.id}`} className="w-full">
          <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-black">
            <img
              className="w-full object-contain rounded-b-lg hover:opacity-70 hover:scale-115 hover:bg-opacity-50 transition-all duration-500 ease-in-out "
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w342/${item.poster_path}`
                  : "/no_poster_available.svg"
              }
            />
          </div>
          <div className="flex flex-col flex-grow items-start justify-start w-full pt-4 bg-black">
            <div className="relative -top-13 left-3 w-full">
              <div className="flex min-h-11 items-end">
                {showRating && (
                  <UserRating
                    rating={item.vote_average ?? 0}
                    color={strokeColor}
                    width="w-12"
                    height="h-12"
                  />
                )}
              </div>
              {/* TODO chips go here when ready */}
              {showGenres && null}

              <h2
                className={`whitespace-pre max-w-full overflow-hidden text-${textSize}/6 -ml-2 mt-1`}
              >
                {itemType === "tv" ? item.name : item.title}
              </h2>
              <p className="text-sm font-light -ml-2">
                {itemType === "tv"
                  ? formattedAirDate !== "Invalid Date"
                    ? formattedAirDate
                    : "Unknown"
                  : formattedReleaseDate !== "Invalid Date"
                  ? formattedReleaseDate
                  : "Unknown"}{" "}
                &#x2022; {itemType === "tv" ? "TV" : "Movie"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ItemCard;
