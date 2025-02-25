import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
const MovieTopRated = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  if (!genres) return null;
  if (!sortOptions) return null;
  return (
    <MediaListContainer
      mediaType='movie'
      //   listType="top_rated"
      heading='Top Rated Movies'
      genres={genres}
      sortBy='vote_average.desc'
      voteAverage={7}
      sortOptions={sortOptions}/>
  );
};

export default MovieTopRated;
