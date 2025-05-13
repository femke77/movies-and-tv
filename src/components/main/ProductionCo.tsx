import { useRef } from 'react';
import { useProductionCo } from '../../hooks/useCompany';

import Showcase from './Showcase';

const ProductionCo = ({
  company_name,
  company_id,
  header,
  provider_id
}: {
  company_name: string;
  company_id: number;
  header: string;
  provider_id?: number;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: items = [], isLoading } = useProductionCo(
    'movie',
    company_name,
    company_id,
    sectionRef,
  );

  return (
    <>
      <Showcase
        ref={sectionRef}
        header={header}
        items={items}
        isLoading={isLoading}
        media_type='movie'
        linkTo='/explore/all-movies'
        section_id={`${company_name}-section`}
        link_state={{ provider: provider_id }}
      />
    </>
  );
};

export default ProductionCo;
