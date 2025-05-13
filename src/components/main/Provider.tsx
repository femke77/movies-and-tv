import { useProvider } from '../../hooks/useProvider';
import Showcase from './Showcase';
import { useRef } from 'react';
const Provider = ({
  provider_name,
  provider_id,
  header,
  media_type,
  genre,
}: {
  provider_name: string;
  provider_id: number;
  header: string;
  media_type: 'movie' | 'tv';
  genre?: string;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { data: items = [], isLoading } = useProvider(
    media_type,
    provider_name,
    provider_id,
    sectionRef,
  );

  return (
    <>
      <Showcase
        ref={sectionRef}
        header={header}
        items={items}
        isLoading={isLoading}
        media_type={media_type}
        linkTo={media_type === 'tv' ? `/explore/all-tv` : `/explore/all-movies`}
        section_id={`${provider_name}-section`}
        link_state={{ genre: genre, provider: provider_id }}
      />
    </>
  );
};

export default Provider;
