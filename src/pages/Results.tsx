import { useSearchTitleQuery } from "../hooks/useSearchAndDiscover";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import ItemCard from "../components/ItemCard";
import { useRef, useEffect } from "react";

// TODO fix for small number of search results
const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data = [], isLoading } = useSearchTitleQuery(query ?? "", "1");
  const lastResultsRef = useRef<IMovie[]>([]);
  const lastLetterRef = useRef<string | null>(null);

  useEffect(() => {
    if (query?.length === 1) {
      lastResultsRef.current = data;
      lastLetterRef.current = query[query.length - 1];
    }
  }, [query, data]);

  const results = query ? data : lastResultsRef.current;

  if (isLoading) return null;

  return (
    <div className="mt-20 mx-4">
      <h2 className="text-3xl font-bold mt-4 mb-8">
        Search results for '{query?.trim() || lastLetterRef.current}'
      </h2>
      <div className="mx-auto">
        <div className="flex flex-wrap flex-1 gap-4 items-start ">
          {results.length > 0 ? (
            results.map((movie: IMovie) => (
              <div
                key={`movie-${movie.id}`}
                className="w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-22.5px)] lg:w-[calc(21%-25px)] xl:max-w-[calc(17%-24px)]"
              >
                <ItemCard item={movie} itemType="movie" />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-400">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
