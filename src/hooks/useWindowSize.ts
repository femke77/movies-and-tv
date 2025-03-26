import { useState, useEffect } from 'react';

/**
 * A custom hook that tracks and returns the current window dimensions.
 *
 * @returns An object containing the current window width and height
 * @property {number} width - The current width of the window in pixels
 * @property {number} height - The current height of the window in pixels
 *
 * @example
 * ```tsx
 * const { width, height } = useWindowSize();
 * console.log(`Window size: ${width}x${height}`);
 * ```
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
