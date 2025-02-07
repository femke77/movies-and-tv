import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SwiperElementProps {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
  }[];

}
 

export default function SwiperElement({ movies}: SwiperElementProps) {
  
 

  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (_s: unknown, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty(
        '--progress',
        (1 - progress).toString(),
      );
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 8400,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
    >
      {movies && movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Slide slide={movie} />
        </SwiperSlide>
      ))}


      <div className='autoplay-progress' slot='container-end'>
        <svg viewBox='0 0 48 48' ref={progressCircle}>
          <circle cx='24' cy='24' r='20'></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}
