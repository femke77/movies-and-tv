import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './components/ScrollToTop.tsx';
import ItemDetailSkeleton from './components/LoadingSkels/ItemCardSkeleton.tsx';

const DMCA = lazy(() => import('./pages/DMCA.tsx'));
const ItemDetail = lazy(() => import('./pages/ItemDetail.tsx'));
const Results = lazy(() => import('./pages/SearchPage.tsx'));
const MovieTopRated = lazy(
  () => import('./pages/moviePages/MovieTopRated.tsx'),
);
const MoviePopular = lazy(() => import('./pages/moviePages/MoviePopular.tsx'));
const MovieTrending = lazy(
  () => import('./pages/moviePages/MovieTrending.tsx'),
);
const TvTrending = lazy(() => import('./pages/tvPages/TvTrending.tsx'));
const TvTopRated = lazy(() => import('./pages/tvPages/TvTopRated.tsx'));
const TvPopular = lazy(() => import('./pages/tvPages/TvPopular.tsx'));
const WatchMovie = lazy(() => import('./pages/watchPages/WatchMovie.tsx'));
const WatchTV = lazy(() => import('./pages/watchPages/WatchTV.tsx'));

// TODO need to add something better than loading to suspense fallback or make new skels for the other pages

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search/:query?',
        element: <Results />,
      },
      {
        path: 'dmca',
        element: <DMCA />,
      },
      {
        path: ':item_type/:id',
        element: (
          <ScrollToTop>
            <Suspense fallback={<ItemDetailSkeleton />}>
              <ItemDetail />
            </Suspense>
          </ScrollToTop>
        ),
      },
      {
        path: 'explore',
        children: [
          {
            path: 'movies',
            element: <MovieTrending />,
          },
          {
            path: 'toprated',
            element: <MovieTopRated />,
          },
          {
            path: 'popular',
            element: <MoviePopular />,
          },
          {
            path: 'tv',
            element: <TvTrending />,
          },
          {
            path: 'top-series',
            element: <TvTopRated />,
          },
          {
            path: 'popular-tv',
            element: <TvPopular />,
          },
        ],
      },
      {
        path: 'watch',
        children: [
          {
            path: 'movie/:movie_id',
            element: <WatchMovie />,
          },
          {
            path: 'tv/:series_id/:season_number/:episode_number',
            element: <WatchTV />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={'Loading....'}></Suspense>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
