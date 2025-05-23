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
import { useActivate } from 'react-activation';

const Slide = lazy(() => import('./Slide'));

export default function SwiperElement() {
  const { data: items = [] } = useTrendingAll();
  const bookmarks = useStore(useShallow((state) => state.bookmarks));

  const swiperRef = useRef<{ swiper: SwiperClass } | null>(null);
  const lastIndexRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleSwiperInit = (swiper: SwiperClass) => {
    swiperRef.current = { swiper };
    // stop autoplay if paused
    if (!isPlaying) {
      swiper.autoplay?.stop();
    }
    // restore slide position
    if (lastIndexRef.current) {
      swiper.slideTo(lastIndexRef.current, 0);
    }
  };

  useActivate(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper || swiper.destroyed) return;

    swiper.update(); // force re-render/layout since keep alive is not allowing a re-mount
    swiper.slideTo(lastIndexRef.current || 0, 0);

    if (isPlaying) {
      swiper.autoplay?.start();
    } else {
      swiper.autoplay?.stop();
    }
  });

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
        onBeforeInit={(swiper) => {
          // makes sure ref is set before useActivate is called
          swiperRef.current = { swiper };
        }}
        onSwiper={handleSwiperInit}
        tabIndex={-1}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex);
          if (swiper) lastIndexRef.current = swiper.activeIndex;
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
        {items.map((item, index) => (
          <SwiperSlide key={`item-${item.id}`}>
            <Suspense fallback={<SlideSkeleton />}>
              <Slide
                slide={item}
                isVisible={index === currentIndex}
                currentIndex={index}
                movieList={items}
                isBookmarked={!!bookmarks?.[`${item.id}-${item.media_type}`]}
              />
            </Suspense>
          </SwiperSlide>
        ))}

        <div
          onClick={handlePlayPause}
          tabIndex={0}
          className='autoplay-pause cursor-pointer'
        >
          {isPlaying ? (
            <Tooltip text='Pause' mb='mb-3'>
              <PauseIcon size={24} />
            </Tooltip>
          ) : (
            <Tooltip text='Play' mb='mb-3'>
              <Play size={24} />
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
