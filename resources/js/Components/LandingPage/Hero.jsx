import React, { useState, useRef } from 'react';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="relative overflow-hidden h-[600px] ">
      {/* Background Media */}
      <div className="absolute inset-0">
        {/* You had a comment about video but only had an image */}
        {/* Uncomment and use this if you want to use video */}
        {/* 
        {!videoLoaded && (
          <img
            src="https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070"
            alt="Luxury houseboat"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        >
          <source src="/your-video-path.mp4" type="video/mp4" />
        </video>
        */}
        
        {/* Current image implementation */}
        <img
          src="/images/img2.jpg"
          alt="Luxury houseboat"
          className="absolute inset-0 w-full h-[600px] object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 h-[600px] bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 h-[600px] bg-gradient-to-r from-black/40 via-transparent to-black/40" />
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

      {/* Scroll Indicator */}
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-white/80 text-sm mb-2">Discover More</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>

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
      `}</style>
    </section>
  );
};

export default Hero;