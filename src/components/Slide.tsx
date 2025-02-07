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
    <div className="swiper-slide bg-black h-auto">
      <div className="relative h-full w-full flex flex-col justify-end"> {/* Flex container for the full height */}
        <img
          className="w-full h-full object-contain"
          src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
          alt={slide.title}
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end items-center mb-12"> {/* Bottom-aligned text */}
          <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
          <p className="text-white">{slide.overview}</p>
        </div>
      </div>
    </div>
  );
};




export default Slide;
