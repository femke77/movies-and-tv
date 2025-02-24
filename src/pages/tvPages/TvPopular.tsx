import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/MediaListContainer';

const TvPopular = () => {
  const { genres } = genreData;

  if (!genres) return null;

  return (
    <MediaListContainer
      mediaType='tv'
      //   listType="top_rated"
      heading='Popular TV Shows'
      genres={genres}
      sortBy='popularity.desc'
      voteAverage={0}
    />
  );
};

export default TvPopular;
