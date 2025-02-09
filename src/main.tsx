import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieDetail from './pages/MovieDetail.tsx';

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
        path: 'movie/:movie_id',
        element: <MovieDetail />,
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
            element: <h1>Top Rated</h1>,
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
