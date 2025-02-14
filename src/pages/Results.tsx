import { useSearchTitleQuery } from "../hooks/useSearchAndDiscover";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import ItemCard from "../components/ItemCard";

// TODO query movies and tv shows and merge them with a property of movie or tv & add the chips

const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data } = useSearchTitleQuery(query ?? "", "1");
  //   console.log(data, isLoading, error);

  return (
    <div className="mt-20 mx-4">
      <h2 className="text-3xl font-bold mt-4 mb-8 ">
        Search results for '{query}'
      </h2>
  
      <div className="flex flex-wrap flex-grow gap-4 justify-center">
        {data?.map((movie: IMovie) => (
          <div key={movie.id}>
            <ItemCard item={movie} itemType="movie" />
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Results;
