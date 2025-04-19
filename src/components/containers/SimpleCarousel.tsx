import type { ReactNode } from 'react';
import { useRef } from 'react';

const SimpleCarousel = ({ children }: { children: ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasMoved = useRef(false);

  const startDragging = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault();
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const stopDragging = () => {
    isDragging.current = false;

    if (hasMoved.current) {
      const carousel = sliderRef.current;
      if (carousel) {
        // prevent the underlying click during capturing phase and remove listener after first click
        carousel.addEventListener(
          'click',
          (e) => {
            e.stopPropagation();
            e.preventDefault();
          },
          { capture: true, once: true },
        );
      }
    }
  };

  const move = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const scroll = x - startX.current;

    //  set hasMoved to true if movement was meaningful (prevents tiny movements from canceling clicks)
    if (Math.abs(scroll) > 5) {
      hasMoved.current = true;
    }

    sliderRef.current.scrollLeft = scrollLeft.current - scroll;
  };

  return (
    <div
      ref={sliderRef}
      className='flex space-x-2 px-4 py-2 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none'
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseDown={startDragging}
      onMouseMove={move}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {children}
    </div>
  );
};

export default SimpleCarousel;


