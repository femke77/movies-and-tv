import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';

const TvAll = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;

  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='tv'
      //   listType="top_rated"
      heading='Explore All TV Shows'
      genres={genres}
      sortBy='popularity.desc'
      voteAverage={0}
      voteCount={0}
      sortOptions={sortOptions}
    />
  );
};

export default TvAll;
