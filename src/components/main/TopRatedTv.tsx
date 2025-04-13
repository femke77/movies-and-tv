import { useTopRatedTv } from '../../hooks/useTopRated';
import Showcase from './Showcase';
import { useRef } from 'react';

const TopRatedTv = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: shows = [], isLoading } = useTopRatedTv(sectionRef);

  return (

     <>
       <Showcase
          ref={sectionRef}
          header='Top Rated Series'
          items={shows}
          isLoading={isLoading}
          media_type='tv'
          linkTo='/explore/top-series'
          section_id='top-tv'
      
          />
       </>
   
  );
};

export default TopRatedTv;
