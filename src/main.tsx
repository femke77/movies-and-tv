import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';

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
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
