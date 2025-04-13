import { useRef } from 'react';
import Showcase from './Showcase';
import { usePopularTv } from '../../hooks/usePopular';

const PopularTv = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: shows = [], isLoading } = usePopularTv(sectionRef);

  return (
    <>
      <Showcase
        ref={sectionRef}
        header='Popular TV'
        items={shows}
        isLoading={isLoading}
        media_type='tv'
        linkTo='/explore/popular-tv'
        section_id='pop-tv'
      />
    </>
  );
};

export default PopularTv;
