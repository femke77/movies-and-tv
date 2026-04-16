import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { isSmartTvBrowser } from '../../utils/helpers';

export function RegisterSWWrapper() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const isTvBrowser = isSmartTvBrowser();

  useEffect(() => {
    if (!isTvBrowser || !('serviceWorker' in navigator)) return;

    const clearTvServiceWorkers = async () => {
      try {
        const reloadFlag = 'tv-cache-reset-reloaded';
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map((registration) => registration.unregister()),
        );

        let clearedCaches = false;
        if ('caches' in window) {
          const cacheKeys = await caches.keys();
          if (cacheKeys.length > 0) {
            await Promise.all(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
            clearedCaches = true;
          }
        }

        const shouldReload = registrations.length > 0 || clearedCaches;
        if (shouldReload && !sessionStorage.getItem(reloadFlag)) {
          sessionStorage.setItem(reloadFlag, '1');
          window.location.reload();
          return;
        }

        sessionStorage.removeItem(reloadFlag);
      } catch (error) {
        console.error('Error unregistering TV service workers:', error);
      }
    };

    void clearTvServiceWorkers();
  }, [isTvBrowser]);

  if (isTvBrowser) return null;

  const updateSW = registerSW({
    onNeedRefresh() {
      setUpdateAvailable(true);
    },
  });

  const handleUpdate = async () => {
    setUpdateAvailable(false);

    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
  
        for (const registration of registrations) {
          const worker = registration.waiting || registration.active;

          if (worker?.state === 'redundant') {
            await registration.unregister();
            window.location.reload();
            return;
          }
        }

        updateSW(true);
      } catch (error) {
        console.error('Error during service worker update:', error);
        updateSW(true);
      }
    } else {
      updateSW(true);
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className='z-100 fixed h-10 bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center'>
      <span>A new update is available!</span>
      <div className='flex gap-2'>
        <button
          className='bg-white text-blue-800 text-sm h-6 p-3 rounded flex items-center justify-center cursor-pointer'
          onClick={handleUpdate}
        >
          Reload
        </button>
        {/* <button
        className="bg-white text-blue-800 text-sm h-6 p-3 rounded flex items-center justify-center"
        onClick={dismissUpdate}
      >
        Dismiss (I will reload later)
      </button> */}
      </div>
    </div>
  );
}
