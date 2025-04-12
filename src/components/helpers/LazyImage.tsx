import { useRef, useState, useEffect } from 'react';

function LazyImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // by the time the cleanup function runs, imgRef.current might not be pointing to the same element it was when the effect first ran, so capture it's value to make sure it's cleaned up correctly:
    const currentImgRef = imgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isVisible ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading='lazy'
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
