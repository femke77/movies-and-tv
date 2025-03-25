import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
const TvPopular = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
useDocumentTitle('Discover Popular TV Shows');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='tv'
      //   listType="top_rated"
      heading='Discover Popular TV Shows'
      genres={genres}
      sortBy='popularity.desc'
      voteAverage={5}
      sortOptions={sortOptions}
      voteCount={500}
    />
  );
};

export default TvPopular;
