import {useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

// trying to fix memory issues with service worker:
export function RegisterSWWrapper() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const updateSW = registerSW({
    onNeedRefresh() {
      setUpdateAvailable(true);
    },
  });

  // Function to handle update with proper unregistration
  const handleUpdate = async () => {
    setUpdateAvailable(false);
    
    if ('serviceWorker' in navigator) {
      try {
        // Get the current registration
        const registration = await navigator.serviceWorker.getRegistration();
        
        if (registration) {
          // Unregister the old service worker
          await registration.unregister();
          console.log('Previous service worker unregistered');
        }
        
        // Call the updateSW function provided by Vite PWA
        // This typically reloads the page and registers the new worker
        updateSW(true);
      } catch (error) {
        console.error('Error during service worker update:', error);
        // Fallback to regular update if unregistration fails
        updateSW(true);
      }
    } else {
      // If service workers aren't supported, just update normally
      updateSW(true);
    }
  };

  if (!updateAvailable) return null;

  return (
    <div className="z-100 fixed h-10 bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center">
      <span>A new update is available!</span>
      <button
        className="bg-white text-blue-800 text-sm h-6 p-3 rounded flex items-center justify-center"
        onClick={handleUpdate}
      >
        Reload
      </button>
    </div>
  );
}