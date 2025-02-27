import dayjs from "dayjs";
import type { IItem } from "../../interfaces/IItem";
import { useItemLogos } from "../../hooks/useTrendingWithLogoFetch";
import genresData from "../../utils/data/genres.json";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import clsx from "clsx";
import { useState, useRef, lazy, useEffect, Suspense } from "react";

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
  const [lowResBgLoaded, setLowResBgLoaded] = useState(false);
  const [highResBgLoaded, setHighResBgLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  // References to avoid race conditions
  const lowResBgRef = useRef(new Image());
  const highResBgRef = useRef(new Image());
  const posterRef = useRef(new Image());

  const criticalElementsLoaded = lowResBgLoaded && contentLoaded;

  const formattedMovieDate = dayjs(slide.release_date).format("MMM D, YYYY");
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
    const genre = genres.find((genre) => genre.id === genreId);
    return genre?.name;
  });

  // Preload images for current and next slides
  useEffect(() => {
    if (isVisible || currentIndex === 0 || currentIndex === 1) {
      // Set content as loaded after a brief delay
      const contentTimer = setTimeout(() => {
        setContentLoaded(true);
      }, 100);

      // low-res background
      if (slide.backdrop_path) {
        lowResBgRef.current.onload = () => setLowResBgLoaded(true);
        lowResBgRef.current.src = `https://image.tmdb.org/t/p/w300${slide.backdrop_path}`;
      }

      // high-res background
      if (slide.backdrop_path) {
        highResBgRef.current.onload = () => setHighResBgLoaded(true);
        highResBgRef.current.src = `https://image.tmdb.org/t/p/w1280${slide.backdrop_path}`;
      }

      if (slide.poster_path) {
        posterRef.current.onload = () => setPosterLoaded(true);
        posterRef.current.src = `https://image.tmdb.org/t/p/w500${slide.poster_path}`;
      }

      if (displayLogo) {
        const logoImg = new Image();
        logoImg.onload = () => setLogoLoaded(true);
        logoImg.src = `https://image.tmdb.org/t/p/w185${displayLogo}`;
      }

      return () => {
        clearTimeout(contentTimer);
      };
    }
  }, [isVisible, currentIndex, slide, displayLogo]);

  return (
    <div className="swiper-slide bg-black h-full flex items-center py-10 z-0 slide-container">
      {/* background image */}
      <div className="relative w-full h-full z-0 overflow-hidden">
               {/* Low-res background (loads first) */}
        <div
          className={clsx(`absolute inset-0 transition-opacity 
    duration-1500 ease-in-out z-0${
      highResBgLoaded ? "opacity-0" : "opacity-100"
    }`)}
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w300${slide.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundPosition: width < 768 ? "center" : "top",
            filter: "blur(10px)",
            transform: "scale(1.1)",
          }}
        />

        {/* High-res background (loads second) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            highResBgLoaded ? "opacity-100" : "opacity-0"
          } ${isVisible ? "visible" : "invisible"}`}
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w1280${slide.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundPosition: width < 768 ? "center" : "top",
          }}
        />

        {/* gradient overlays */}
        <div className="absolute bottom-0 left-0 w-full h-1/8 sm:h-1/2 bg-gradient-to-t from-black to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 sm:via-black/50 md:via-black/50 lg:via-black/50 to-transparent z-1" />

        {/* card content */}
        <div
          className={`max-w-[1800px] mx-auto relative h-full z-2 transition-opacity duration-700 ${
            criticalElementsLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* left, top - genre, release date, title logo */}
          <div
            className={clsx(`absolute flex flex-col px-16 md:px-18 lg:px-26 xl:ml-10 z-5
              ${
                width < 950
                  ? "w-full h-full justify-center mt-5"
                  : "w-1/2 top-1/2 transform -translate-y-1/2 mt-5"
              } `)}
          >
            {/* Genre and date section - always at top */}
            <div
              className={clsx(
                `flex flex-col h-[30px] ${
                  width < 950 ? "items-center" : "items-start"
                }`
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
                  <p className="text-white">&#x2022;</p>
                )}

                <p className="text-white font-light ml-4">
                  {slide.media_type === "movie"
                    ? slide.release_date !== "Invalid Date"
                      ? formattedMovieDate
                      : null
                    : null}
                </p>
              </div>
            </div>

            {/* Content container */}
            <div className="flex flex-col">
              {/* Title/logo section */}
              <Link to={`/${slide.media_type}/${slide.id}`} className="block">
                <div
                  className={`flex flex-col ${
                    width < 950 ? "items-center" : "items-start"
                  }`}
                >
                  {/* Logo with placeholder */}
                  <div className="h-[150px] mb-6">
                    {displayLogo ? (
                      logoLoaded ? (
                        <img
                          className="h-auto max-h-[80px] w-auto max-w-64"
                          src={`https://image.tmdb.org/t/p/w185${displayLogo}`}
                          alt={slide.title || slide.name}
                          loading="eager"
                          height={80}
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
                    <p className="text-white line-clamp-2 md:line-clamp-3 text-center md:text-left mb-6 h-[72px]">
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
                  `flex flex-row items-center ${
                    width < 950 ? "justify-center" : "justify-start"
                  } mt-2 h-[50px]`
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
           {width >= 950 && slide.poster_path && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-16 md:mr-20 lg:mr-40 mt-5 z-10 h-[450px] w-[320px]">
              {/* Poster placeholder */}
              <div
                className={`w-78 h-[450px] rounded-lg bg-gray-800/50 absolute ${
                  posterLoaded ? 'opacity-0' : 'opacity-100'
                } transition-opacity duration-500`}
              />

              {/* Actual poster with direct onLoad handler */}
              <img
                className={`w-full h-auto rounded-lg object-cover transition-opacity duration-500 ${
                  posterLoaded ? 'opacity-100' : 'opacity-0'
                }`}
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
    </div>
  );
};

export default Slide;
