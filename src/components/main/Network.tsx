import { useNetwork } from '../../hooks/useNetwork';
import Showcase from './Showcase';
import { useRef } from 'react';
const Network = ({
  network_name,
  network_id,
  header,
  provider_id,
}: {
  network_name: string;
  network_id: number;
  header: string;
  provider_id?: number;
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
        linkTo='/explore/all-tv'
        section_id={`${network_name}-section`}
        link_state={{ provider: provider_id }}
      />
    </>
  );
};

export default Network;
