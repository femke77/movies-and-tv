import { useRef } from 'react';
import { useProductionCo } from '../../hooks/useCompany';

import Showcase from './Showcase';

const ProductionCo = ({
  company_name,
  company_id,
  header,
}: {
  company_name: string;
  company_id: number;
  header: string;
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
        linkTo='/explore/movies'
        section_id={`${company_name}-section`}
      />
    </>
  );
};

export default ProductionCo;
