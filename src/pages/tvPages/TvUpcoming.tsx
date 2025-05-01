import genreData from '../../utils/data/tvGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
import dayjs from 'dayjs';

const TvUpcoming = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Upcoming New Series | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='tv'
      heading='Upcoming New Series (Next 30 Days)'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteAverage={0}
      voteCount={0}
      first_air_date_gte={dayjs().format('YYYY-MM-DD')}
     first_air_date_lte={dayjs().add(30, 'day').format('YYYY-MM-DD')}
      showRating={false}
    />
  );
};

export default TvUpcoming;