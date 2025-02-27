import dayjs from "dayjs";
import type { IItem } from "../../interfaces/IItem";
import { useItemLogos } from "../../hooks/useTrendingWithLogoFetch";
import genresData from "../../utils/data/genres.json";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useState, useRef, lazy, useEffect, Suspense } from "react";

// TODO skeleton is sometimes in mobile view - ???

const UserRating = lazy(() => import("../UserRating"));
const WatchButton = lazy(() => import("../WatchButton"));

// Placeholder components
const LogoPlaceholder = () => (
  <div className="w-64 h-16 bg-gray-700/30 animate-pulse rounded mb-6"></div>
);

const TextPlaceholder = () => (
  <div className="w-full space-y-2 mb-6">
    <div className="h-4 bg-gray-700/30 animate-pulse rounded w-3/4"></div>
    <div className="h-4 bg-gray-700/30 animate-pulse rounded w-full"></div>
    <div className="h-4 bg-gray-700/30 animate-pulse rounded w-1/2"></div>
  </div>
);

const ButtonPlaceholder = () => (
  <div className="w-28 h-10 bg-gray-700/30 rounded-full animate-pulse"></div>
);

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
  const [highResBgLoaded, setHighResBgLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // References to avoid race conditions
  const posterRef = useRef(new Image());
  const logoRef = useRef(new Image());
  const highResBgRef = useRef(new Image());

  const criticalElementsLoaded = contentLoaded;

  const formattedMovieDate = dayjs(slide.release_date).format("MMM D, YYYY");
  const { genres } = genresData;

  const logoFromQuery = useItemLogos(
    slide.id,
    slide.media_type ?? "movie",
    isVisible,
    currentIndex,
    movieList
  );
  const displayLogo = logoFromQuery || null;

  const movieGenres = slide.genre_ids.map((genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  // Preload images and set loaded state
  useEffect(() => {
    if (isVisible || currentIndex === 0) {
      // Set content as loaded after a brief delay
      const contentTimer = setTimeout(() => {
        setContentLoaded(true);
      }, 100);

      // if (slide.backdrop_path && highResBgRef.current) {
      //   highResBgRef.current.onload = () => setHighResBgLoaded(true);
      //   highResBgRef.current.src = `https://image.tmdb.org/t/p/w1280${slide.backdrop_path}`;
      // }

      if (slide.poster_path && posterRef.current) {
        posterRef.current.onload = () => setPosterLoaded(true);
        posterRef.current.src = `https://image.tmdb.org/t/p/w500${slide.poster_path}`;
      }

      if (displayLogo && logoRef.current) {
        logoRef.current.onload = () => setLogoLoaded(true);
        logoRef.current.src = `https://image.tmdb.org/t/p/w185${displayLogo}`;
      }

      return () => {
        clearTimeout(contentTimer);
      };
    }
  }, [isVisible, currentIndex, slide, displayLogo]);

  return (
    <div className="swiper-slide bg-black h-full flex items-center py-10 slide-container overflow-hidden ">
      <div
        className={clsx(`absolute inset-0 w-full h-full bg-cover bg-center md:bg-top transition-opacity 
         duration-1000 ease-in-out ${
           isVisible ? "opacity-100" : "opacity-0"
         } z-0`)}
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${slide.backdrop_path}')`,
        }}
      >
        {/* gradient overlays */}
        <div className="absolute bottom-0 left-0 w-full h-1/8 sm:h-1/2 bg-gradient-to-t from-black to-transparent " />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent " />
      </div>
      {/* card content */}
      <div
        className="max-w-[1800px] mx-auto relative h-full"
        style={{
          opacity: criticalElementsLoaded ? 1 : 0,
          transition: "opacity 700ms ease-in-out",
        }}
      >
        {/* left, top - genre, release date, title logo */}
        <div
          className="absolute w-full h-full justify-center mt-5 flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10 
          [@media(min-width:950px)]:justify-center 
          [@media(min-width:950px)]:w-1/2 
          [@media(min-width:950px)]:top-1/2 
          [@media(min-width:950px)]:transform 
          [@media(min-width:950px)]:-translate-y-1/2"
        >
          {/* Genre and date section*/}
          <div
            className={clsx(
              `flex flex-col h-[30px] items-center [@media(min-width:950px)]:items-start `
            )}
          >
            <div className={`flex justify-start items-start mb-6 pb-6`}>
              {movieGenres.length >= 1 &&
                movieGenres.slice(0, 2).map((genre) => (
                  <span
                    key={`${genre}-${slide.id}`}
                    className="text-white ml-0 mr-4"
                  >
                    {genre}
                  </span>
                ))}

              {slide.media_type === "movie" && (
                <p className="hidden [@media(min-width:400px)] text-white">
                  &#x2022;
                </p>
              )}

              <p className="hidden [@media(min-width:400px)] text-white font-light ml-4">
                {slide.media_type === "movie"
                  ? slide.release_date !== "Invalid Date"
                    ? formattedMovieDate
                    : null
                  : null}
              </p>
            </div>
          </div>

          {/* Content container */}
          <div className="flex flex-col mt-6 mb-6">
            {/* Title/logo section */}
            <Link to={`/${slide.media_type}/${slide.id}`} className="block">
              <div
                className={`flex flex-col items-center [@media(min-width:950px)]:items-start`}
              >
                {/* Logo with placeholder */}
                <div className="h-[250] my-6 mt-6 mb-10">
                  {displayLogo ? (
                    logoLoaded ? (
                      <img
                        className="h-auto max-h-[250px] w-68"
                        src={`https://image.tmdb.org/t/p/w185${displayLogo}`}
                        alt={slide.title || slide.name}
                        loading="eager"
                        height={150}
                        width={250}
                      />
                    ) : (
                      <LogoPlaceholder />
                    )
                  ) : (
                    <h2 className="text-4xl font-bold text-white">
                      {slide.title || slide.name}
                    </h2>
                  )}
                </div>

                {/* Overview text with placeholder */}
                {contentLoaded ? (
                  <p className="text-white line-clamp-2 md:line-clamp-3 text-center [@media(min-width:950px)]:text-left mb-10 h-[72px] px-0 sm:px-6 [@media(min-width:950px)]:px-0">
                    {slide.overview}
                  </p>
                ) : (
                  <TextPlaceholder />
                )}
              </div>
            </Link>

            {/* Buttons section */}
            <div
              className={clsx(
                `flex flex-row items-center justify-center [@media(min-width:950px)]:justify-start  mt-2 h-[50px]`
              )}
            >
              <div className="mb-2 mr-10">
                {contentLoaded ? (
                  <Suspense fallback={<ButtonPlaceholder />}>
                    <WatchButton />
                  </Suspense>
                ) : (
                  <ButtonPlaceholder />
                )}
              </div>
              <div className="mb-2">
                {contentLoaded ? (
                  <Suspense
                    fallback={
                      <div className="w-12 h-12 bg-gray-700/30 rounded-full animate-pulse"></div>
                    }
                  >
                    <UserRating rating={slide.vote_average ?? 0} />
                  </Suspense>
                ) : (
                  <div className="w-12 h-12 bg-gray-700/30 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Poster image with placeholder  */}
        {slide.poster_path && (
          <div className="hidden [@media(min-width:950px)]:block [@media(min-width:950px)]:absolute [@media(min-width:950px)]:right-0 [@media(min-width:950px)]:top-1/2 [@media(min-width:950px)]:transform [@media(min-width:950px)]:-translate-y-1/2 mr-16 md:mr-20 lg:mr-40 mt-5 [@media(min-width:950px)]:h-[450px] [@media(min-width:950px)]:w-[320px] z-10">
            {/* Poster placeholder */}
            <div
              className={`w-78 h-[450px] rounded-lg bg-gray-800/50 absolute ${
                posterLoaded ? "opacity-0" : "opacity-100"
              }`}
              style={{ transition: "opacity 500ms ease-in-out" }}
            />

            {/* Actual poster with direct onLoad handler */}
            <img
              className={`w-full h-auto rounded-lg object-cover ${
                posterLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transition: "opacity 500ms ease-in-out" }}
              src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
              alt={slide.title || slide.name}
              loading="eager"
              width={320}
              height={450}
              onLoad={() => setPosterLoaded(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide;
