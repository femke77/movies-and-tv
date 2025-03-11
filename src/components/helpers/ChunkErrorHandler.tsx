import { useEffect } from 'react';
import { useRouteError } from 'react-router';
import ErrorPage from '../../pages/ErrorPage';

const ChunkErrorHandler = () => {
  const error = useRouteError() as Error | null;
  console.error('Router error caught:', error);

  // Check if it's a chunk loading error
  const isChunkError =
    error?.name === 'ChunkLoadError' ||
    error?.name === 'TypeError' ||
    (error?.message &&
      (error.message.includes('Failed to fetch dynamically imported module') ||
        error.message.includes('Loading chunk') ||
        error.message.includes('Failed to load module script')));

  // Use the hook unconditionally
  useEffect(() => {
    if (isChunkError) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [isChunkError]);

  if (isChunkError) {
    return <div>Application update detected. Reloading...</div>;
  }

  // For any other errors, show your regular error page
  return <ErrorPage />;
};
export default ChunkErrorHandler;
