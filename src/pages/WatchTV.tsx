import {
  useTVSeasonEpisodes,
  useWatchDetails,
} from '../hooks/useItemOrWatchDetail';

const WatchTV = () => {
  const { data: show } = useWatchDetails('tv', '1668');
  console.log(show);
  const { data: episodes } = useTVSeasonEpisodes('1668', '2');
  console.log(episodes);

  return (
    <div className='mt-24'>
      <h1>WatchTV</h1>
    </div>
  );
};
export default WatchTV;
