import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';


const TvPopular = () => {

  
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  
  if (!genres) return null;
  if (!sortOptions) return null;
  

  return (
    <MediaListContainer
      mediaType='tv'
      //   listType="top_rated"
      heading='Popular TV Shows'
      genres={genres}
      sortBy='popularity.desc'
      voteAverage={0}
      sortOptions={sortOptions}
    />
  );
};

export default TvPopular;
