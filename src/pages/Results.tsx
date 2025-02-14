import { useSearchTitleQuery } from "../hooks/useSearchAndDiscover";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import ItemCard from "../components/ItemCard";

// TODO query movies and tv shows and merge them with a property of movie or tv & add the chips

// Results.tsx
const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data } = useSearchTitleQuery(query ?? "", "1");

  return (
    <div className="mt-20 mx-4">
      <h2 className="text-3xl font-bold mt-4 mb-8">
        Search results for '{query}'
      </h2>
      
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 items-start">
        {data?.map((movie: IMovie) => (
          <div 
            key={movie.id} 
            className="min-w-[180px] max-w-[350px] w-full"
          >
            <ItemCard item={movie} itemType="movie" />
          </div>
        ))}
      </div>
    </div>
  );}

  export default Results;