import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
const MovieAll = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Explore All Movies | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='movie'
      //   listType="popular"
      heading='Explore All Movies'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteAverage={0}
      voteCount={0}
    />
  );
};

export default MovieAll;
