import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

export function RegisterSWWrapper() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  const updateSW = registerSW({
    onNeedRefresh() {
      setUpdateAvailable(true);
    },
  });

  useEffect(() => {}, []);

  if (!updateAvailable) return null;

  return (
    <div className='z-100 fixed h-10 bottom-0 left-0 right-0 bg-blue-600 text-white p-4 flex justify-between items-center'>
      <span>A new update is available!</span>
      <button
        className='bg-white text-blue-800 text-sm h-6 p-3 rounded flex items-center justify-center'
        onClick={() => {
          updateSW();
          setUpdateAvailable(false);
        }}
      >
        Reload
      </button>
    </div>
  );
}
