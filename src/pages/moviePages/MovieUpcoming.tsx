import genreData from '../../utils/data/movieGenres.json';
import MediaListContainer from '../../components/containers/MediaListContainer';
import sortOptionsData from '../../utils/data/sortOptions.json';
import useDocumentTitle from '../../hooks/usePageTitles';
import dayjs from 'dayjs';

const MovieUpcoming = () => {
  const { genres } = genreData;
  const { sortOptions } = sortOptionsData;
  useDocumentTitle('Upcoming Movies | BingeBox');
  if (!genres) return null;
  if (!sortOptions) return null;

  return (
    <MediaListContainer
      mediaType='movie'
      heading='Upcoming Movies (Next 30 Days)'
      genres={genres}
      sortBy='popularity.desc'
      sortOptions={sortOptions}
      voteAverage={0}
      voteCount={0}
      primary_release_date_gte={dayjs().format('YYYY-MM-DD')}
      primary_release_date_lte={dayjs().add(30, 'day').format('YYYY-MM-DD')}
      showRating={false}
    />
  );
};

export default MovieUpcoming;
