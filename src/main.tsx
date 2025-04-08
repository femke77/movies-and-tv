import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient } from '@tanstack/react-query';
import ItemDetailSkeleton from './components/loadingSkeletons/ItemDetailSkeleton.tsx';
import NotFound from './pages/404.tsx';
import ItemCardSkeletonGrid from './components/loadingSkeletons/ItemCardSkeletonGrid.tsx';
import DelayedSuspense from './components/helpers/DelayedSuspense.tsx';
import ChunkErrorHandler from './components/helpers/ChunkErrorHandler.tsx';
import FAQPage from './pages/FAQ.tsx';
import CastDetailSkeleton from './components/loadingSkeletons/CastDetailSkeleton.tsx';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { RegisterSWWrapper } from './components/helpers/RegisterSWWrapper.tsx';
import { AliveScope, KeepAlive } from 'react-activation';
import WatchPageSkeleton from './components/loadingSkeletons/WatchPageSkeleton.tsx';
import TextSkeleton from './components/loadingSkeletons/TextSkeleton.tsx';
import HistoryPageSkeleton from './components/loadingSkeletons/HistoryPageSkeleton.tsx';

const History = lazy(() => import('./pages/watchPages/ContHistory.tsx'));
const CastMemberDetail = lazy(
  () => import('./pages/detailPages/CastMemberDetail.tsx'),
);
const Watchlist = lazy(() => import('./pages/Watchlist.tsx'));
const TvAll = lazy(() => import('./pages/tvPages/TvAll.tsx'));
const MovieAll = lazy(() => import('./pages/moviePages/MovieAll.tsx'));
const ItemDetail = lazy(() => import('./pages/detailPages/ItemDetail.tsx'));
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
      gcTime: 1000 * 60 * 60 * 24, // added this here for persistance requirementts of gcTime >= maxAge (below)
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    },
  },
});
const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ChunkErrorHandler />,

    element: <App />,
    children: [
      {
        index: true,
        element: (
          <KeepAlive saveScrollPosition='screen' name='home'>
            <Home />
          </KeepAlive>
        ),
      },
      {
        path: 'search/:query?',
        element: (
          <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
            <Results />
          </DelayedSuspense>
        ),
      },

      {
        path: 'dmca',
        element: (
          <DelayedSuspense fallback={<TextSkeleton />}>
            <DMCA />
          </DelayedSuspense>
        ),
      },
      {
        path: 'faqs',
        element: (
          <DelayedSuspense fallback={<TextSkeleton />}>
            <FAQPage />
          </DelayedSuspense>
        ),
      },

      {
        path: ':item_type/:id',
        element: (
        
            <DelayedSuspense fallback={<ItemDetailSkeleton />}>
              <ItemDetail />
            </DelayedSuspense>
      
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
          {
            path: 'cast/:id',
            element: (
              <DelayedSuspense fallback={<CastDetailSkeleton />}>
                <CastMemberDetail />
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
            element: (
              <DelayedSuspense fallback={<WatchPageSkeleton />}>
                <WatchMovie />
              </DelayedSuspense>
            ),
          },
          {
            path: 'tv/:series_id',
            element: (
              <DelayedSuspense fallback={<WatchPageSkeleton />}>
                <WatchTV />
              </DelayedSuspense>
            ),
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'saved',
            element: (
              <DelayedSuspense fallback={<ItemCardSkeletonGrid />}>
                <Watchlist />
              </DelayedSuspense>
            ),
          },
          {
            path: 'history',
            element: (
              <DelayedSuspense fallback={<HistoryPageSkeleton />}>
                <History />
              </DelayedSuspense>
            ),
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister,
      maxAge: 1000 * 60 * 60 * 24,
      // uncomment the next line and add something to the string text to bust the cache if needed
      // buster:'',
      dehydrateOptions: {
        shouldDehydrateQuery: (query) => {
          // Only persist specific query types
          const queryKey = query.queryKey;
          return queryKey[0] === 'logo' || queryKey[0] === 'all_trending_items';
        },
      },
    }}
  >
    <RegisterSWWrapper />
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  </PersistQueryClientProvider>,
);

// https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient
