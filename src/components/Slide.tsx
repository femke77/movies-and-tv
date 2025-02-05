
interface SlideProps {
    title: string;
    overview: string;
    backdrop_path: string;
    id: number;
    vote_average: number;
    release_date: string;
    genre: string;
    quality: string
  }

const Slide = ({ slide }: { slide: SlideProps }) => {
    return (
        <div className="swiper-slide bg-black">
            <div className="relative h-96 w-full">
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                    alt={slide.title}
                />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-1/2 flex flex-col justify-center items-center p-4">
                    <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
                    <p className="text-white">{slide.overview}</p>
                </div>
            </div>
        </div>
    )

}

export default Slide;