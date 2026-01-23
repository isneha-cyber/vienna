import React, { useEffect, useRef } from 'react';

const Escape = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Simple scroll-based animation without external GSAP library
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

        // Apply clip-path animation
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
    <div className="w-full  py-12 sm:py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4  items-center ">
        {/* Image Section - 70% on desktop */}
        <div
          ref={imageRef}
          className="w-full md:col-span-7 overflow-hidden sm:pe-28"
          style={{
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0.7,
            transition: 'clip-path 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <img
            src="/images/img1.jpg"
            alt="Island lifestyle"
            className="w-full h-auto object-cover "
          />
        </div>

        {/* Text Section - 30% on desktop */}
        <div className="md:col-span-3 flex items-center   md:pe-36 text-center">
          <h2 className="text-4xl  lg:text-6xl  leading-tight from-netural-50 mt-2">
            The Island is set to be your dream escape
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Escape;