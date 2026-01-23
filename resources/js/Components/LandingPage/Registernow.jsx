import React, { useEffect, useRef } from 'react';

const Registernow = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    // Scroll-based animation
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
    <div className="w-full py-12 sm:py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-8 lg:gap-12 items-center ">
        {/* Image Section - 60% on desktop */}
        <div
          ref={imageRef}
          className=" w-full md:col-span-6 overflow-hidden"
          style={{
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0.7,
            transition: 'clip-path 0.1s ease-out, opacity 0.1s ease-out'
          }}
        >
          <img
            src="/images/img1.jpg"
            alt="Island lifestyle"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Section - 40% on desktop */}
        <div className="md:col-span-4 flex flex-col justify-center space-y-4 sm:space-y-6 px-4 sm:px-0">
          <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl  leading-tight text-gray-900">
            Join Stella Loyalty Circle and enjoy exclusive benefits.
          </h3>
          <p className="text-base sm:text-lg font-light text-gray-700 leading-relaxed">
            Register now and feel pampered from the moment you arrive until the moment you check out.
          </p>
          <button className="border-2 border-gray-900 bg-gray-900 text-white transition-colors duration-300 py-2  px-6 sm:px-8 text-sm sm:text-base font-medium uppercase tracking-wider w-fit">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registernow;