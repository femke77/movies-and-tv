import genreData from "../utils/data/genres.json";
import MediaListContainer from "../components/MediaListContainer";

const MoviePopular = () => {
  const {genres} = genreData;

  
  if (!genres) return null;

  return (
    <MediaListContainer
      mediaType="movie"
      listType="popular"
      heading="Popular Movies"
      genres={genres}
      sortBy="popularity.desc"
   
    />
  );
};

export default MoviePopular;
