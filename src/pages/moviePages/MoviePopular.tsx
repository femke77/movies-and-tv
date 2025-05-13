import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
import { useLocation } from 'react-router-dom';

const MoviePopular = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Discover Popular Movies | BingeBox');
  const { state } = useLocation();

  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='movie'
      heading='Discover Popular Movies'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteCount={500}
      voteAverage={5}
      genre={state?.genre}
    />
  );
};

export default MoviePopular;
