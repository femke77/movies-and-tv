import { useState, useEffect } from 'react';
/**
 * A custom hook that measures the duration of a loading state.
 * 
 * @param {Object} params - The parameters object
 * @param {boolean} params.isLoading - A boolean flag indicating whether the component is in a loading state
 * @returns {Object} An object containing the loading duration
 * @returns {number|null} returns.loadingTime - The time in milliseconds that the loading state was active, or null if loading hasn't completed
 * 
 * @example
 * ```tsx
 * const { loadingTime } = useLoadingPerformance({ isLoading });
 * ```
 */

const useLoadingPerformance = ({ isLoading }: { isLoading: boolean }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      setStartTime(performance.now());
    } else {
      if (startTime) {
        setLoadingTime(performance.now() - startTime);
      }
    }
  }, [isLoading, startTime]);

  // loadingTime represents the duration for which the loading state was true
  return { loadingTime };
};

export default useLoadingPerformance;
