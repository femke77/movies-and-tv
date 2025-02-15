import { useSearchTitleQuery } from "../hooks/useSearchAndDiscover";
import { useParams } from "react-router-dom";
import { IMovie } from "../interfaces/IMovie";
import ItemCard from "../components/ItemCard";
import { useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const SearchContainer = () => {
  const searchQuery = useOutletContext<string>();
  const lastLetterRef = useRef<string | null>(null);

  useEffect(() => {
    if (searchQuery.length === 1) {
      lastLetterRef.current = searchQuery;
    }
  }, [searchQuery]);
  
  return (
    <div className="mt-20 mx-4">
      <h2 className="text-3xl font-bold mt-4 mb-8 relative">
        <span>Search results for {searchQuery || lastLetterRef.current}</span>
        <div className="inline" style={{ display: "inline" }}>
          <Results />
        </div>
      </h2>
    </div>
  );
};

const Results = () => {
  const { query } = useParams<{ query: string }>();
  const { data = [], isLoading } = useSearchTitleQuery(query ?? "", "1");
  const lastResultsRef = useRef<IMovie[]>([]);

  useEffect(() => {
    if (query?.length === 1) {
      lastResultsRef.current = data;
    }
  }, [query, data]);

  const results = query ? data : lastResultsRef.current;

  if (isLoading) return null;

  return (
    <>
      <div className="ml-2 mt-8">
        <div className="flex flex-wrap flex-1 gap-4 items-start">
          {results.length > 0 ? (
            results.map((movie: IMovie) => (
              <div
                key={`movie-${movie.id}`}
                className="w-[calc(50%-15px)] sm:w-[calc(33%-10px)] md:w-[calc(25%-17px)] lg:w-[calc(26%-25px)] xl:max-w-[calc(19%-1px)]"
              >
                <ItemCard
                  textSize="xl"
                  item={movie}
                  itemType="movie"
                  showRating={false}
                  showGenres={false}
                />
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-400">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchContainer; // Export the container instead
