// import type { IMovie } from "../interfaces/IMovie";


const TrendingMovies = () => {
    // const { data, error, isLoading } = useQuery('trending', getTrendingMovies);
    
    // if (isLoading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
        <h2 className="text-2xl font-bold mb-8">Trending 🔥</h2>
        <ul>
            {/* {data.results.map((movie: IMovie) => (
            <li key={movie.id}>{movie.title}</li>
            ))} */}
        </ul>
        </div>
    );
    };
    
    export default TrendingMovies;