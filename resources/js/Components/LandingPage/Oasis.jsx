import React, { useEffect, useRef, useState } from 'react';

const Oasis = () => {
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      
      const element = imageRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress (0 to 1)
        const progress = Math.min(
          Math.max((windowHeight - rect.top) / (windowHeight * 0.8), 0),
          1
        );
        
        // Apply clip-path animation with easing
        const clipValue = 100 - progress * 100;
        element.style.clipPath = `inset(0 ${clipValue}% 0 0)`;
        element.style.opacity = 0.7 + progress * 0.3;
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
    
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-0">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
        
        {/* Content Section - 20% on desktop, full width on mobile */}
        <div className="w-full lg:max-w-sm relative flex items-center justify-center  lg:justify-end order-2 lg:order-1">
          {/* Decorative Line - Desktop only */}
          <div className="hidden lg:block absolute right- top-6 -translate-y-1/2 z-10">
            <div className="w-16 xl:w-40 h-0.5 bg-black translate-x-24"></div>
          </div>
          
          <div className="text-center lg:text-right w-full lg:pr-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[62px] mb-4 pr-8">
              An oasis of luxury and tranquility
            </h3>
          </div>
        </div>

        {/* Image Section - 80% on desktop, full width on mobile */}
        <div className="w-full lg:w-4/5 order-1 lg:order-2">
          <div
            ref={imageRef}
            className="relative w-full overflow-hidden "
            style={{
              clipPath: 'inset(0 100% 0 0)',
              opacity: 0.7,
              transition: 'clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out'
            }}
          >
            <img
              src="./images/img1.jpg"
              alt="Luxury resort pool with tropical palms at sunset"
              className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] object-cover"
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Oasis;