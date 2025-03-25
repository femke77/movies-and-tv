import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
const MoviePopular = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Discover Popular Movies');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='movie'
      //   listType="popular"
      heading='Discover Popular Movies'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteCount={500}
      voteAverage={5}
    />
  );
};

export default MoviePopular;
