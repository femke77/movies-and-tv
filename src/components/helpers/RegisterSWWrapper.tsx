import { useEffect } from 'react';
import { isSmartTvBrowser } from '../../utils/helpers';

export function RegisterSWWrapper() {
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

  return null;
}
