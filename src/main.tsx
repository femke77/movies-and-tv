import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemDetail from './pages/ItemDetail.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Results from './pages/Results.tsx';
import MovieTopRated from './pages/MovieTopRated.tsx';
const queryClient = new QueryClient();

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
        path: ':type/:id',
        element: (
          <ScrollToTop>
            <ItemDetail />
          </ScrollToTop>
        ),
      },
      {
        path: 'explore',
        children: [
          {
            path: 'movies',
            element: <h1>Explore Movies</h1>,
          },
          {
            path: 'toprated',
            element: <MovieTopRated />,
          },
          {
            path: 'popular',
            element: <h1>Popular</h1>,
          },
        ],
      },
      {
        path: 'watch',
        children: [
          {
            path: 'movie/:movie_id',
            element: <h1>Watch Movie</h1>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
