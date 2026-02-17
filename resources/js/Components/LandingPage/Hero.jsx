import React, { useState, useRef } from 'react';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const scrollToNextSection = () => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * 0.8, // Scrolls to 80% of viewport height
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative overflow-hidden h-[600px] ">
      {/* Background Media */}
      <div className="absolute inset-0">
        {/* Current image implementation */}
        <img
          src="/images/img2.jpg"
          alt="Luxury houseboat"
          className="absolute inset-0 w-full h-[600px] object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 h-[600px] bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        {/* <div className="absolute inset-0 h-[600px] bg-gradient-to-r from-black/40 via-transparent to-black/40" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
              Your Floating
              <span className="block font-serif italic mt-2">Paradise</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Updated design */}
      <button 
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 group cursor-pointer"
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-3 font-medium tracking-wider">Discover More</span>
          
          {/* Upward Arrow in Circle */}
         <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-7 w-7 text-white group-hover:translate-y-1 transition-transform duration-300"
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
</div>
          
          {/* Optional: Add subtle pulsing animation */}
          <div className="absolute inset-0 w-14 h-14 rounded-full border border-white/20 animate-ping opacity-50" />
        </div>
      </button>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .group:hover .group-hover\\:animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;