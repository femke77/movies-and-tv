import { useRef, useState, lazy, Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTrendingAll } from '../../hooks/useTrendingWithLogoFetch';
import SlideSkeleton from '../loadingSkeletons/SlideSkeleton';


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Slide = lazy(() => import('./Slide'));

export default function SwiperElement() {
  const { data: items = [] } = useTrendingAll();
  // const [modalData, setModalData] = useState({
  //   id: '',
  //   type: '',
  //   isBookmarked: false,
  // });
  // const [bookmarks, setBookmarks] = useState<{ id: string; type: string }[]>(
  //   [],
  // );

  // useEffect(() => {
  //   const loadBookmarks = () => {
  //     const bookmarksString = localStorage.getItem('bookmarks');
  //     if (bookmarksString) {
  //       setBookmarks(JSON.parse(bookmarksString));
  //     }
  //   };

  //   loadBookmarks();
  // }, []);

  // const handleBookmarkClick = (
  //   id: string,
  //   type: string,
  //   isBookmarked: boolean,
  // ) => {
  //   setModalData({ id, type, isBookmarked });
  //   (
  //     document.getElementById('my_modal_3') as HTMLDialogElement | null
  //   )?.showModal();
  // };

  // const handleBookmarkChange = (
  //   id: string,
  //   type: string,
  //   isBookmarked: boolean,
  // ) => {
  //   if (isBookmarked) {
  //     setBookmarks((prev) => [...prev, { id, type }]);
  //   } else {
  //     setBookmarks((prev) =>
  //       prev.filter((b) => !(b.id === id && b.type === type)),
  //     );
  //   }
  // };

  // const isItemBookmarked = (id: string, type: string) => {
  //   return bookmarks.some((b) => b.id === id && b.type === type);
  // };

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
        tabIndex={-1}
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
                 
                />
              </Suspense>
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
