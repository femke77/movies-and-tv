
import UserRating from "./UserRating";
import WatchButton from "./WatchButton";

interface SlideProps {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  poster_path: string;

}

const Slide = ({ slide }: { slide: SlideProps }) => {
  return (
    <div className="swiper-slide bg-black h-96 flex items-center">
      <div
        className="relative w-full h-full bg-cover bg-center md:bg-top"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${slide.backdrop_path}')`,
        }}
      >
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 sm:via-black/50 to-transparent" />



        <div className="absolute mr-6 sm:mr-0 sm:w-1/2 ml-12 h-full flex flex-col justify-center  p-8">
          <h2 className="text-4xl font-bold text-white mb-6">{slide.title}</h2>
          <p className="text-white">{slide.overview}</p>

          <div className="flex flex-col sm:flex-row items-center justify-around mt-4">
            <UserRating rating={slide.vote_average} />
            <WatchButton />
          </div>
        </div>

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
