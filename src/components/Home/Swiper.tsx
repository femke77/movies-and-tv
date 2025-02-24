import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTrendingAll } from '../../hooks/useAllTrendingWithLogoFetch';
import Slide from './Slide';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function SwiperElement() {
  const { data: items = [] } = useTrendingAll();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <>
      <Swiper
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {items &&
          items.map((item, index) => (
            <SwiperSlide key={`item-${item.id}`}>
              <Slide
                slide={item}
                isVisible={index === currentIndex}
                currentIndex={index}
                movieList={items}
              />
            </SwiperSlide>
          ))}

        <div className='autoplay-progress' slot='container-end'>
          <svg viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
