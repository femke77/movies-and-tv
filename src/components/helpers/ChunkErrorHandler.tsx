import { useEffect, useState } from 'react';
import { useRouteError } from 'react-router';
import ErrorPage from '../../pages/ErrorPage';

const ChunkErrorHandler = () => {
  const error = useRouteError() as Error;
  const [countdown, setCountdown] = useState(5);

  console.error('Router error caught:', error);
  
  // Extract the error message 
  const errorMessage = error?.message || '';
  
  // Check specifically for chunk loading errors
  const isChunkError = 
    errorMessage.includes('Failed to fetch dynamically imported module') ||
    errorMessage.includes('Failed to load module script') ||
    (errorMessage.includes('MIME type') && errorMessage.includes('module scripts'));
  
  console.log('Is chunk error detected:', isChunkError);

  useEffect(() => {
    if (!isChunkError) return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.reload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isChunkError]);

  const handleManualRefresh = () => {
    window.location.reload();
  };

  if (isChunkError) {
    return (
      <div className='flex flex-col items-center justify-center p-8 text-white/80 text-center min-h-screen'>
        <h2 className='text-xl font-bold mb-4'>Application Update Detected</h2>
        <p className='mb-4'>
          The application has been updated. Reloading in {countdown} seconds to
          get the latest version...
        </p>
        <button
          onClick={handleManualRefresh}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
        >
          Refresh Now
        </button>
      </div>
    );
  }

  // For any other errors:
  return <ErrorPage />;
};

export default ChunkErrorHandler;
