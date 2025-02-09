import { TMDBClient } from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import type { IMovie } from "../interfaces/IMovie";

const fetchTrendingMovies = async () => {
    const { data } = await TMDBClient.get("/trending/movie/day?language=en-US");
    return data.results;
    }

    export const useTrendingMovies = () => {
        return useQuery<IMovie[], Error>({
            queryKey: ["trending-movies"],
            queryFn: fetchTrendingMovies,
        });
    };
