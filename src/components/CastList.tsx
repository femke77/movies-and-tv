import { useRef } from "react";
import type { ICast } from "../interfaces/ICast";
import { CastCard } from "./CastCard";

export const CastList = ({ cast }: { cast: ICast[] }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const startDragging = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    e.preventDefault(); // Prevents image drag effect
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  const move = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const scroll = x - startX.current;
    sliderRef.current.scrollLeft = scrollLeft.current - scroll;
  };

  return (
    <div
      ref={sliderRef}
      className="flex space-x-4 px-4 py-2 w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory 
                 cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      onMouseDown={startDragging}
      onMouseMove={move}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {cast.map((actor) => (
        <div key={actor.id} onMouseDown={(e) => e.preventDefault()}>
          <CastCard cast={actor} />
        </div>
      ))}
    </div>
  );
};
