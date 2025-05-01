import { useRef, useState, lazy, Suspense } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTrendingAll } from '../../hooks/useTrendingWithLogoFetch';
import SlideSkeleton from '../loadingSkeletons/SlideSkeleton';
import { useStore } from '../../state/store';
import { useShallow } from 'zustand/react/shallow';
import Tooltip from '../modals/ToolTip';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PauseIcon, Play } from 'lucide-react';

const Slide = lazy(() => import('./Slide'));

export default function SwiperElement() {
  const { data: items = [] } = useTrendingAll();
  // subscribe to bookmarks array in zustand store for reactivity and don't use suspense b/c it will block the entire component
  const bookmarks = useStore(useShallow((state) => state.bookmarks));
  const swiperRef = useRef<{ swiper: SwiperClass } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      swiperRef.current?.swiper.autoplay.stop();
    } else {
      swiperRef.current?.swiper.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

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
        onSwiper={(swiper) => {
          swiperRef.current = { swiper };
        }}
        tabIndex={-1}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex)
                  
        }}
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
        speed={10}
      >
        {items &&
          items.map((item, index) => (
            <SwiperSlide key={`item-${item.id}`}>
              <Suspense fallback={<SlideSkeleton />}>
                <Slide
                  slide={item}
                  isVisible={index === currentIndex}
                  currentIndex={index}
                  movieList={items}
                  isBookmarked={
                    bookmarks
                      ? !!bookmarks?.[`${item.id}-${item.media_type}`]
                      : false
                  }
                />
              </Suspense>
            </SwiperSlide>
          ))}

        <div onClick={handlePlayPause} className='autoplay-pause'>
          {isPlaying ? (
            <PauseIcon size={28} />
          ) : (
            <Tooltip text='Play' mb='mb-2'>
              <Play size={28} />
            </Tooltip>
          )}
        </div>

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
