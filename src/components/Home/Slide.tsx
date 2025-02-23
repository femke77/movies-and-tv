import dayjs from "dayjs";
import UserRating from "../UserRating";
import WatchButton from "../WatchButton";
import type { IItem } from "../../interfaces/IItem";
import { useItemLogos } from "../../hooks/useAllTrending";
import genresData from "../../utils/data/genres.json";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";

const Slide = ({
  slide,
  isVisible,
  currentIndex,
  movieList,
}: {
  slide: IItem;
  isVisible: boolean;
  currentIndex: number;
  movieList: IItem[];
}) => {
  const formattedDate = dayjs(slide.release_date).format("MMM D, YYYY");
  const { genres } = genresData;
  const { width } = useWindowSize();

  const logoFromQuery = useItemLogos(
    slide.id,
    slide.media_type ?? "movie",
    isVisible,
    currentIndex,
    movieList
  );
  const displayLogo = logoFromQuery || null;

  const movieGenres = slide.genre_ids.map((genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre?.name;
  });

  return (
    <div className=" swiper-slide bg-black h-full flex items-center py-10">
      {/* background image */}
      <div
        className="relative w-full h-full bg-cover bg-center md:bg-top"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${slide.backdrop_path}')`,
        }}
      >
        {/* gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent" />

        {/* card content */}
        <div className="max-w-[1800px] mx-auto">
          <div className="absolute md:w-1/2 h-full flex flex-col justify-center px-16 md:px-18 lg:px-26 xl:ml-10">
            {/* left, top - genre, release date, title logo */}

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-start mb-12 ">
                {width > 390 ? (
                  <>
                    {movieGenres.length >= 1 &&
                      movieGenres.slice(0, 2).map((genre) => (
                        <span
                          key={`${genre}-${slide.id}`}
                          className="text-white mr-5 mb-2"
                        >
                          {genre}
                        </span>
                      ))}
                  </>
                ) : (
                  <>
                    {movieGenres.length >= 1 &&
                      movieGenres.slice(0, 1).map((genre) => (
                        <span
                          key={`${genre}-${slide.id}`}
                          className="text-white  ml-0"
                        >
                          {genre}
                        </span>
                      ))}
                  </>
                )}
                <p className="text-white font-light ml-8">
                  {formattedDate !== "Invalid Date" && formattedDate}
                </p>
              </div>
            </div>

            {/* left, mid - title or title logo, overview */}
            <Link to={`/${slide.media_type}/${slide.id}`}>
              <div className="flex flex-col items-center md:items-start">
                {displayLogo ? (
                  <img
                    className="mb-8 w-64 h-auto"
                    src={`https://image.tmdb.org/t/p/w185${displayLogo}`}
                  />
                ) : (
                  <h2 className="text-4xl font-bold text-white mb-12">
                    {slide.title || slide.name}
                  </h2>
                )}
                <p className="text-white line-clamp-2 md:line-clamp-3 text-center md:text-left mb-8">
                  {slide.overview}
                </p>
              </div>
            </Link>

            {/* left, bottom - rating and watch componentns */}
            <div className="flex flex-row items-center justify-around mt-4 ">
              <div className="mb-2">
                <WatchButton />
              </div>
              <div className="pl-4 mb-2">
                <UserRating rating={slide.vote_average ?? 0} />
              </div>
            </div>
          </div>
          {/* right, only - poster image */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 md:mr-24 lg:mr-48 hidden md:block">
            {slide.poster_path && (
              <img
                className="w-78 h-auto rounded-lg pt-10 "
                src={
                  slide.poster_path
                    ? `https://image.tmdb.org/t/p/w500${slide.poster_path}`
                    : "/no_poster_available.svg"
                }
                alt={slide.title}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide;
