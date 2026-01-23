import React, { useEffect, useRef } from 'react';

const Test = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const sectionsRef = useRef([]);

  const sections = [
    {
      id: 'cuisine',
      image: '/images/img7.jpg',
      subtitle: 'cuisine',
      title: "Tastes you'll remember"
    },
    {
      id: 'resort',
      image: '/images/img8.jpg',
      subtitle: 'resort',
      title: 'Experience the Island'
    },
    {
      id: 'activities',
      image: '/images/img9.jpeg',
      subtitle: 'activities',
      title: 'What to Do'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only run when component is in viewport
      if (containerRect.top > windowHeight || containerRect.bottom < 0) return;
      
      // Calculate scroll progress within the component
      const scrollProgress = (windowHeight - containerRect.top) / (windowHeight + containerRect.height);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Determine which image to show
      let imageIndex = 0;
      if (clampedProgress > 0.66) {
        imageIndex = 2;
      } else if (clampedProgress > 0.33) {
        imageIndex = 1;
      }
      
      // Animate sections
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionProgress = Math.abs(imageIndex - index);
          const opacity = sectionProgress === 0 ? 1 : 0.4;
          const scale = sectionProgress === 0 ? 1 : 0.95;
          
          section.style.opacity = opacity;
          section.style.transform = `scale(${scale})`;
          section.style.transition = 'all 0.6s ease-out';
        }
      });
      
      // Update background image
      if (imageRef.current.style.backgroundImage !== `url("${sections[imageIndex].image}")`) {
        imageRef.current.style.backgroundImage = `url("${sections[imageIndex].image}")`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image - High Quality */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-700 ease-out"
        style={{ 
          backgroundImage: `url("/images/img7.jpg")`,
          backgroundSize: 'cover',
          imageRendering: 'high-quality'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content - Compact Spacing */}
      <div className="relative z-10 h-full min-h-screen flex flex-col justify-center items-center gap-12 sm:gap-16 md:gap-20 lg:gap-24 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="text-center text-white max-w-2xl"
          >
            <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-2 sm:mb-3 font-light opacity-80 letterspacing">
              {section.subtitle}
            </p>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight">
              {section.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;