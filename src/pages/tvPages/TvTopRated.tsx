import genreData from "../../utils/data/tvGenres.json";
import MediaListContainer from "../../components/MediaListContainer";

const TvTopRated = () => {
  const { genres } = genreData;

  if (!genres) return null;

  return (
    <MediaListContainer
      mediaType="tv"
      //   listType="top_rated"
      heading="Top Series"
      genres={genres}
      sortBy="vote_average.desc"
      voteAverage={7}
    />
  );
};

export default TvTopRated;
