import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';

const MovieTopRated = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
useDocumentTitle('Discover Top Rated Movies | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='movie'
      //   listType="top_rated"
      heading='Discover Top Rated Movies'
      genres={genres}
      sortBy='vote_average.desc'
      voteAverage={7}
      sortOptions={sortOptions}
      voteCount={1000}
    />
  );
};

export default MovieTopRated;
