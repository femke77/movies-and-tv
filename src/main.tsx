import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ItemDetail from "./pages/ItemDetail.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Results from "./pages/SearchPage.tsx";
import MovieTopRated from "./pages/moviePages/MovieTopRated.tsx";
import MoviePopular from "./pages/moviePages/MoviePopular.tsx";
import MovieTrending from "./pages/moviePages/MovieTrending.tsx";
import TvTrending from "./pages/tvPages/TvTrending.tsx";
import TvTopRated from "./pages/tvPages/TvTopRated.tsx";
import TvPopular from "./pages/tvPages/TvPopular.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search/:query?",
        element: <Results />,
      },
      {
        path: ":type/:id",
        element: (
          <ScrollToTop>
            <ItemDetail />
          </ScrollToTop>
        ),
      },
      {
        path: "explore",
        children: [
          {
            path: "movies",
            element: <MovieTrending />,
          },
          {
            path: "toprated",
            element: <MovieTopRated />,
          },
          {
            path: "popular",
            element: <MoviePopular />,
          },
          {
            path: "tv",
            element: <TvTrending />,
          },
          {
            path: "top-series",
            element: <TvTopRated />,
          },
          {
            path: "popular-tv",
            element: <TvPopular />,
          },
        ],
      },
      {
        path: "watch",
        children: [
          {
            path: "movie/:movie_id",
            element: <h1>Watch Movie</h1>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
