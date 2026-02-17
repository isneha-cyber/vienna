import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Wellness2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const images = [
    '/images/ab4.jpg',
    '/images/well1.jpg',
    '/images/well2.jpg'
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    gsap.to(slider, {
      x: `-${currentSlide * 100}%`,
      duration: 0.8,
      ease: "power3.out"
    });
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      {/* Hero Slider Section */}
      <div className="relative overflow-hidden max-w-7xl mx-auto py-24">
        <div className="flex transition-transform duration-800 ease-out" ref={sliderRef}>
          {images.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative h-[60vh] md:h-[96vh]">
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}

        {/* Dots Indicator */}
        {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div> */}

        {/* Slide Counter */}
        {/* <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {images.length}
        </div> */}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 mt-4 sm:mt-8 ">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Tip Top Treatment
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience premium wellness treatments with our exclusive packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Treatment Card 1 */}
          <div className="group bg-white  overflow-hidden transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src="/images/well4.png" 
                alt="Romantic Rejuvenation"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Romantic Rejuvenation for Couples
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                ELEMIS Garden of England Restore and Relaxing Massage 60' Use of Jacuzzi, 
                2 glasses of sparkling wine and tropical fruit salad and sweets
              </p>
           
            </div>
          </div>

          {/* Treatment Card 2 */}
          <div className="group bg-white  overflow-hidden transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src="/images/well5.png" 
                alt="Romantic Rejuvenation"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Romantic Rejuvenation for Couples
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                ELEMIS Garden of England Restore and Relaxing Massage 60' Use of Jacuzzi, 
                2 glasses of sparkling wine and tropical fruit salad and sweets
              </p>
           
            </div>
          </div>

          {/* Treatment Card 3 */}
          <div className="group bg-white  overflow-hidden transition-all duration-300">
            <div className="relative overflow-hidden">
              <img 
                src="/images/well6.png" 
                alt="Romantic Rejuvenation"
                className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                Romantic Rejuvenation for Couples
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                ELEMIS Garden of England Restore and Relaxing Massage 60' Use of Jacuzzi, 
                2 glasses of sparkling wine and tropical fruit salad and sweets
              </p>
            
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Wellness2;