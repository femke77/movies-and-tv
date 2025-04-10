import { useRef, useState, useEffect } from "react";

function LazyImage({ src, alt, className }:{
    src: string;
    alt: string;
    className?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
      
      return () => {
        if (imgRef.current) {
          observer.disconnect();
        }
      };
    }, []);
    
    return (
      <div ref={imgRef} className={className}>
        {isVisible ? (
          <img 
            src={src} 
            alt={alt} 
            className={className}
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/noimage2.webp';
            }}
          />
        ) : (
          <div className={`${className} bg-gray-800`} />
        )}
      </div>
    );
  }


  export default LazyImage;