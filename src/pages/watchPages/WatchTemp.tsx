import { useParams } from 'react-router-dom';
// import { useWatchDetails } from "../hooks/useItemOrWatchDetail";
// import WatchDescription from "../components/WatchDescription";

const WatchMovie = () => {
  const { movie_id } = useParams<{ movie_id: string }>();
  // const { data: movie } = useWatchDetails("movie", movie_id ?? "");

  return (
    <div className='mt-24 flex flex-wrap '>
      <div className='relative pb-[56.25%] h-[0] basis-full lg:basis-1/2 overflow-hidden'>
        <iframe
          className='absolute top-0 left-0 w-full basis-full lg:basis-1/2'
          width='100%'
          height='100%'
          src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
          allowFullScreen
        ></iframe>

        <div></div>
      </div>
      <div>{/* <WatchDescription title={movie.title} /> */}</div>
    </div>
  );
};

export default WatchMovie;