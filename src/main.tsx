import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './components/helpers/ScrollToTop.tsx';
import ItemDetailSkeleton from './components/loadingSkeletons/ItemDetailSkeleton.tsx';
import NotFound from './pages/404.tsx';
import ItemCardSkeletonGrid from './components/loadingSkeletons/ItemCardSkeletonGrid.tsx';
import DelayedSuspense from './components/helpers/DelayedSuspense.tsx';

import WatchMovieTmp from './pages/watchPages/WatchTemp.tsx';

import ChunkErrorHandler from './components/helpers/ChunkErrorHandler.tsx';
import Watchlist from './pages/Watchlist.tsx';

const TvAll = lazy(() => import('./pages/tvPages/TvAll.tsx'));
const MovieAll = lazy(() => import('./pages/moviePages/MovieAll.tsx'));
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
const DMCA = lazy(() => import('./pages/DMCA.tsx'));

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
    errorElement: <ChunkErrorHandler />,

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
            <DelayedSuspense fallback={<ItemDetailSkeleton />}>
              <ItemDetail />
            </DelayedSuspense>
          </ScrollToTop>
        ),
      },
      {
        path: 'explore',
        children: [
          {
            path: 'movies',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <MovieTrending />
              </DelayedSuspense>
            ),
          },
          {
            path: 'toprated',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <MovieTopRated />
              </DelayedSuspense>
            ),
          },
          {
            path: 'popular',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <MoviePopular />
              </DelayedSuspense>
            ),
          },
          {
            path: 'all-movies',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <MovieAll />
              </DelayedSuspense>
            ),
          },
          {
            path: 'tv',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <TvTrending />
              </DelayedSuspense>
            ),
          },
          {
            path: 'top-series',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <TvTopRated />
              </DelayedSuspense>
            ),
          },
          {
            path: 'popular-tv',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <TvPopular />
              </DelayedSuspense>
            ),
          },
          {
            path: 'all-tv',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <TvAll />
              </DelayedSuspense>
            ),
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
            path: 'tv/:series_id',
            element: <WatchTV />,
          },
          {
            path: 'temp/:movie_id',
            element: <WatchMovieTmp />,
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'saved',
            element: <Watchlist />,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <ChunkLoadErrorBoundary> */}
      <RouterProvider router={router} />
      {/* </ChunkLoadErrorBoundary> */}
    </QueryClientProvider>
  </StrictMode>,
);
