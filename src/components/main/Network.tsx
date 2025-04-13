import { useNetwork } from '../../hooks/useNetwork';
import Showcase from './Showcase';
import { useRef } from 'react';
const Network = ({
  network_name,
  network_id,
  header,
}: {
  network_name: string;
  network_id: number;
  header: string;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: items = [], isLoading } = useNetwork(
    'tv',
    network_name,
    network_id,
    sectionRef,
  );

  return (

    <>
    <Showcase
       ref={sectionRef}
       header={header}
       items={items}
       isLoading={isLoading}
       media_type='tv'
       linkTo='/explore/tv'
       section_id={`${network_name}-section`}
    
 
       />
    </>
   
  );
};

export default Network;
