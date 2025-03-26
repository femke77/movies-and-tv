import TrendingContainer from '../../components/containers/TrendingContainer';
import useDocumentTitle from '../../hooks/usePageTitles';
const TvTrending = () => {
  useDocumentTitle('Trending TV Shows | BingeBox');
  return <TrendingContainer mediaType='tv' heading='Trending TV Shows' />;
};

export default TvTrending;
