import TrendingContainer from '../../components/containers/TrendingContainer';
import useDocumentTitle from '../../hooks/usePageTitles';
const MovieTrending = () => {
  useDocumentTitle('Trending Movies| BingeBox ');
  return <TrendingContainer mediaType='movie' heading='Trending Movies' />;
};

export default MovieTrending;
