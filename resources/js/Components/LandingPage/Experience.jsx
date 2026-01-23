import React, { useState } from 'react';

const Experience = () => {
  const accommodations = [
    {
      id: '01',
      title: 'Premium Swim Up',
      size: '34m²',
      guests: 'Up to 3 guests, 1 king-size bed or 2 single beds and 1 sofa bed',
      feature: 'Wooden deck with direct access to lagoon pool',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80'
    },
    {
      id: '02',
      title: 'Grand Overwater Bungalow With Jacuzzi',
      size: '39m²',
      guests: 'Up to 3 guests, 1 king-size bed and 1 sofa bed',
      feature: 'Wooden deck with direct access to lagoon pool',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    },
    {
      id: '03',
      title: 'Island Villa Private Pool',
      size: '35m²',
      guests: 'Up to 2 guests, 1 king-size bed',
      feature: 'Private terrace with direct access to private pool',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === accommodations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? accommodations.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white py-12 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-7xl mx-auto">
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-4">
          Your Stay Experience at the Island
        </h3>
        <p className="text-base sm:text-lg text-gray-600 mb-12 sm:mb-16">
          Discover life's pleasures in Stella Island's accommodation experience.
        </p>

        {/* Mobile & Tablet: Custom Slider */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {accommodations.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0 px-2">
                  <div className="group relative overflow-hidden h-full flex flex-col">
                    {/* Card Container */}
                    <div className="relative aspect-[3/4] bg-white overflow-hidden flex-shrink-0">
                      {/* Background Image */}
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
                      
                      {/* Semi-transparent gradient overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Number Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-8xl sm:text-9xl font-light opacity-50">
                          {item.id}
                        </span>
                      </div>
                      
                      {/* Title Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center px-6 top-52">
                        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light text-center leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-white p-6 text-left flex flex-col flex-grow">
                      {/* Icons and Info */}
                      <div className="space-y-3 mb-6 text-lg text-gray-700 flex-grow">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
                          </svg>
                          <span className="text-sm sm:text-base">{item.size}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-sm sm:text-base">{item.guests}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="text-sm sm:text-base">{item.feature}</span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 border border-gray-800 text-gray-800 py-2.5 px-4 text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors duration-300">
                          MORE INFO
                        </button>
                        <button className="flex-1 bg-[#2b2b2b] text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
                          BOOK NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {accommodations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gray-800 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {accommodations.map((item) => (
            <div key={item.id} className="group relative overflow-hidden h-full flex flex-col">
              {/* Card Container */}
              <div className="relative aspect-[3/4] bg-white overflow-hidden flex-shrink-0">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
                
                {/* Semi-transparent gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Number Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-8xl sm:text-9xl font-light opacity-50">
                    {item.id}
                  </span>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute inset-0 flex items-center justify-center px-6 top-52">
                  <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-light text-center leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Details Section */}
              <div className="bg-white p-6 text-left flex flex-col flex-grow">
                {/* Icons and Info */}
                <div className="space-y-3 mb-6 text-lg text-gray-700 flex-grow">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z" />
                    </svg>
                    <span className="text-sm sm:text-base">{item.size}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm sm:text-base">{item.guests}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm sm:text-base">{item.feature}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 border border-gray-800 text-gray-800 py-2.5 px-4 text-sm font-medium hover:bg-gray-800 hover:text-white transition-colors duration-300">
                    MORE INFO
                  </button>
                  <button className="flex-1 bg-[#2b2b2b] text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800 transition-colors duration-300">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;