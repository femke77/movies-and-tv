import { useParams } from "react-router-dom";

const Watch = () => {
  const { movie_id } = useParams<{ movie_id: string }>();

  return (
    <div className="mt-24 flex flex-wrap ">
      <div className="relative pb-[56.25%] h-[0] basis-full lg:basis-1/2">
        <iframe
          className="absolute top-0 left-0 w-full h-full basis-full lg:basis-1/2"
          width="100%"
          height="100%"
          src={`https://vidsrc.xyz/embed/movie/${movie_id}`}
          allowFullScreen
        ></iframe>
      </div>
      <div>
        {/* server switch */}
      </div>
    </div>
  );
};

export default Watch;
