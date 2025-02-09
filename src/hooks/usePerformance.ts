import { useState, useEffect } from 'react';

const usePerformance = ({ isLoading }: { isLoading: boolean }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);

  useEffect(() => {
    if (isLoading) {
      setStartTime(performance.now());
    } else {
      if (!isLoading && startTime)
        setLoadingTime(performance.now() - startTime);
    }
  }, [isLoading, startTime]);

  return { loadingTime };
};

export default usePerformance;
