import dayjs from "dayjs";
import UserRating from "./UserRating";
import WatchButton from "./WatchButton";
import type { IMovie } from "../interfaces/IMovie";

const Slide = ({ slide }: { slide: IMovie }) => {
  const formattedDate = dayjs(slide.release_date).format("MMM D, YYYY");

  return (
    <div className="swiper-slide bg-black h-96 flex items-center">
      {/* background image */}
      <div
        className="relative w-full h-full bg-cover bg-center md:bg-top"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${slide.backdrop_path}')`,
        }}
      >
        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent" />

        {/* card content */}
        <div className="absolute mr-6 sm:mr-0 sm:w-1/2 ml-12 h-full flex flex-col justify-center  p-8">
          {/* top left - genre, release date, title logo */}
          <div className="flex flex-col items-start">
            <p className="text-white font-light mb-12">{formattedDate}</p>
{/* TODO genre */}
          </div>

          {/* mid left- title or title logo, overview */}
          <div className="flex flex-col items-center">
            {slide.title_logo ? (
              <img
                className="mb-6"
                src={`https://image.tmdb.org/t/p/w185/${slide.title_logo}`}
              />
            ) : (
              <h2 className="text-4xl font-bold text-white mb-6">
                {slide.title}
              </h2>
            )}
            <p className="text-white">{slide.overview}</p>
          </div>

          {/* bottom left- rating and watch componentns */}
          <div className="flex flex-col sm:flex-row items-center justify-around mt-4">
            <UserRating rating={slide.vote_average} />
            <WatchButton />
          </div>
        </div>

        {/* right - poster image */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-8 md:mr-24 lg:mr-48 hidden sm:block">
          <img
            className="w-64 h-auto rounded-lg shadow-lg"
            src={`https://image.tmdb.org/t/p/w185${slide.poster_path}`}
            alt={slide.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
