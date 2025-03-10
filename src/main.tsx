import { StrictMode, Suspense, lazy, Component } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './components/ScrollToTop.tsx';
import ItemDetailSkeleton from './components/LoadingSkels/ItemCardSkeleton.tsx';
import ErrorPage from './pages/404.tsx';
import NotFound from './pages/404.tsx';

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

interface ChunkLoadErrorBoundaryProps {
  children: React.ReactNode;
}

class ChunkLoadErrorBoundary extends Component<ChunkLoadErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: { message: string }) {
    // for lazy loading 404 errors after a redeploy
    if (error.message && error.message.includes('Loading chunk')) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: { message: string }) {
    console.error('Chunk loading error:', error);
  }

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='mt-40 text-center'>
          <h2>Something went wrong</h2>
          <p>
            The app was likely updated. Please refresh to get the latest
            version.
          </p>
          <button
            className='bg-gray-800/50 text-white'
            onClick={this.refreshPage}
          >
            Refresh Now
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    errorElement: <ErrorPage />,

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
            path: 'all-movies',
            element: <MovieAll />,
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
          {
            path: 'all-tv',
            element: <TvAll />,
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
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChunkLoadErrorBoundary>
        <Suspense
          fallback={<span className='loader min-h-screen flex mx-auto'></span>}
        >
          <RouterProvider router={router} />
        </Suspense>
      </ChunkLoadErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
);
