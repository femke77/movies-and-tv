import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
import { useLocation } from 'react-router-dom';
const TvAll = () => {
  const { state } = useLocation();
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Explore All TV Shows | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='tv'
      heading='Explore All TV Shows'
      genres={genres}
      sortBy='popularity.desc'
      voteAverage={0}
      voteCount={0}
      sortOptions={sortOptions}
      watchProvider={(state && String(state?.provider)) || ''}
    />
  );
};

export default TvAll;
