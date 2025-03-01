import { useParams } from 'react-router-dom';

const Watch = () => {
  const { movie_id } = useParams<{ movie_id: string }>();

  return (
    <div className='mt-24 h-[600px]'>
      <iframe
        width='100%'
        height='100%'
        src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Watch;
