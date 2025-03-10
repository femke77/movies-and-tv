import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';

const MoviePopular = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;

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
