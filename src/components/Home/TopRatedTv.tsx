import SlideContainer from "../CarouselContainer";
import { useTopRatedTv } from "../../hooks/useTopRated";
import { useRef } from "react";

const TopRatedTv = () => {
  const { data: shows = [] } = useTopRatedTv();

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 ml-5">Top Rated TV 🔝</h2>
      <SlideContainer
        ref={ref}
        items={shows}
        itemType="tv"
        id="top-tv-section"
      />
    </div>
  );
};

export default TopRatedTv;