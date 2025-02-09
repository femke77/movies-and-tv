import type { IMovie } from "../interfaces/IMovie";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import ItemCard from "./ItemCard";

const TrendingMovies = () => {
    const { data: movies=[], error, isLoading } = useTrendingMovies();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="">
            <h2 className="text-2xl font-bold mb-8">Trending 🔥</h2>
            <ul className="flex flex-wrap gap-4">
                {movies && movies.map((movie: IMovie) => (
            <li key={movie.id}><ItemCard item={movie}/></li>
            ))}
            </ul>
        </div>
    );
};

export default TrendingMovies;