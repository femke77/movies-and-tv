import { TMDBClient } from "../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import type { IItem } from "../interfaces/IItem";
import { useEffect, useState } from "react";

const fetchTrendingMovies = async () => {
  const { data } = await TMDBClient.get("/trending/movie/day?language=en-US");
  return data.results;
};

export const useTrendingMovies = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldFetch(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px 150px" }
    );

    // TODO see about creating ref here and forwarding it down to avoid direct dom interaction
    const target = document.getElementById("trending-section");
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, []);

  return useQuery<IItem[], Error>({
    queryKey: ["trending-movies"],
    queryFn: fetchTrendingMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 25, // 25 hours
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30, // 30 minutes
    enabled: shouldFetch,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), //exponential backoff
    placeholderData: (previousData) => previousData,
  });
};
