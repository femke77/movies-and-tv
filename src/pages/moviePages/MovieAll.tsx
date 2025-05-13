import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
import { useLocation } from 'react-router-dom';
const MovieAll = () => {
  const { state } = useLocation();
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Explore All Movies | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  
  return (
    <MediaListContainer
      mediaType='movie'
      heading='Explore All Movies'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteAverage={0}
      voteCount={0}
      watchProvider={(state && String(state?.provider)) || ""}
    />
  );
};

export default MovieAll;
