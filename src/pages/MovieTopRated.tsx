import genreData from "../utils/data/genres.json";
import MediaListContainer from "../components/MediaListContainer";

const MovieTopRated = () => {
  const {genres} = genreData;

  
  if (!genres) return null;

  return (
    <MediaListContainer
      mediaType="movie"
    //   listType="top_rated"
      heading="Top Rated Movies"
      genres={genres}
      sortBy="vote_average.desc"
      voteAverage={7}
   
    />
  );
};

export default MovieTopRated;