import React, { Suspense, useEffect, useState } from 'react';


const DelayedSuspense = ({ children, fallback, delay = 300 }: {
    children: React.ReactNode;
    fallback: React.ReactNode;
    delay?: number;
}) => {
    const [showFallback, setShowFallback] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }, [delay]);
    
    return (
      <Suspense fallback={showFallback ? fallback : null}>
        {children}
      </Suspense>
    );
  }


  export default DelayedSuspense;