import { useTrendingTv } from '../../hooks/useTrending';
import { useRef } from 'react';

import Showcase from './Showcase';
const TrendingTV = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: shows = [], isLoading } = useTrendingTv(sectionRef);

  return (
    <>
      <Showcase
        ref={sectionRef}
        header={`Today's Trending TV Shows`}
        items={shows}
        isLoading={isLoading}
        media_type='tv'
        linkTo='/explore/tv'
        section_id='trending-tv'
        link_state={{ time: 'day' }}
      />
    </>
  );
};

export default TrendingTV;
