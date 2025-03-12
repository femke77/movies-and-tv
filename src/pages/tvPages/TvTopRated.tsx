import genreData from "../../utils/data/tvGenres.json";
import MediaListContainer from "../../components/containers/MediaListContainer";
import sortOptionsData from "../../utils/data/sortOptions.json";

const TvTopRated = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;

  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType="tv"
      //   listType="top_rated"
      heading="Discover Top TV Series"
      genres={genres}
      sortBy="vote_average.desc"
      voteAverage={7}
      sortOptions={sortOptions}
      voteCount={1000}
    />
  );
};

export default TvTopRated;
