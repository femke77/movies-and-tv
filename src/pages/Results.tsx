import { useSearchTitleQuery } from "../hooks/useSearchAndDiscover";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import ItemCard from "../components/ItemCard";
import { useRef, useEffect } from "react";

const Results = () => {
  const { query,} = useParams<{ query: string }>();
  const { data = [], isLoading} = useSearchTitleQuery(query ?? "", "1");
  const lastResultsRef = useRef<IMovie[]>([]);
  const lastLetterRef = useRef<string | null>(null);
  
  if (isLoading) return null;
  
  useEffect(() => {
    if (query?.length===1) {
      lastResultsRef.current = data;
      lastLetterRef.current = query[query.length - 1];
    }
  }, [query, data]);

  const results = query ? data : lastResultsRef.current;

  return (
    <div className="mt-20 mx-4">
      <h2 className="text-3xl font-bold mt-4 mb-8">
        Search results for '{query || lastLetterRef.current}'
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(50%-10px,350px),1fr))] sm:grid-cols-[repeat(auto-fit,minmax(min(180px,350px),1fr))] gap-4 items-start">
        {results.length > 0 ? (
          results.map((movie: IMovie) => (
            <div key={movie.id} className="min-w-[100px] sm:min-w-[180px] max-w-[350px] w-full">
              <ItemCard item={movie} itemType="movie" />
            </div>
          ))
        ) : (
          <p className="text-lg text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
