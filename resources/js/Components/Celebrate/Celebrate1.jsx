import React, { useState } from 'react';

const Celebrate1 = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const imagesRow1 = [
    {
      src: "/images/cele1.png",
      alt: "Celebration 1",
      title: "Elegant Weddings",
      description: "Unforgettable wedding celebrations"
    },
    {
      src: "/images/cele2.jpg",
      alt: "Celebration 2",
      title: "Birthday Parties",
      description: "Memorable birthday experiences"
    },
    {
      src: "/images/cele3.jpg",
      alt: "Celebration 3",
      title: "Gala Dinners",
      description: "Sophisticated evening events"
    }
  ];

  const imagesRow2 = [
    {
      src: "/images/cele4.jpg",
      alt: "Celebration 4",
      title: "Cocktail Parties",
      description: "Stylish social gatherings"
    },
    {
      src: "/images/cele5.jpg",
      alt: "Celebration 5",
      title: "Anniversaries",
      description: "Cherished milestone celebrations"
    },
    {
      src: "/images/cele6.jpg",
      alt: "Celebration 6",
      title: "Corporate Events",
      description: "Professional business functions"
    }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 sm:py-10 lg:py-12">
        <h3 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light lg:max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
          <span className="block">We create.</span>
          <span className="block lg:ps-24 xl:ps-36 mt-1 sm:mt-2">You celebrate</span>
        </h3>

        <p className="text-sm xs:text-base sm:text-lg max-w-3xl mx-auto lg:mx-0 text-center lg:text-left mt-4 lg:mt-0">
          Whether you're planning a wedding reception, a birthday celebration, 
          a gala dinner, a cocktail party, or an anniversary, we're here to 
          arrange everything to perfection.
        </p>
      </div>

      {/* First Image Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 max-w-7xl gap-3 xs:gap-4 sm:gap-5 lg:gap-6 xl:gap-8 mx-auto px-3 xs:px-4 sm:px-5 lg:px-6 xl:px-8">
        {imagesRow1.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden  group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className="w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300">
              {/* Overlay Content Container */}
              <div className="absolute inset-x-0 bottom-0 p-3 xs:p-4 sm:p-5 lg:p-6 transform transition-all duration-300 group-hover:translate-y-0">
                <div className="relative">
                  {/* Title with Background on Mobile */}
                  <div className="inline-block">
                    <h4 className="text-lg xs:text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-semibold text-white">
                      {image.title}
                    </h4>
                    <div className="h-0.5 xs:h-1 w-full bg-white mt-1 xs:mt-2 transform origin-left transition-all duration-300 group-hover:scale-x-100 scale-x-0"></div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-white/90 mt-2 xs:mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Hover Border */}
           
          </div>
        ))}
      </div>

      {/* Second Image Row */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 max-w-7xl gap-3 xs:gap-4 sm:gap-5 lg:gap-6 xl:gap-8 mx-auto px-3 xs:px-4 sm:px-5 lg:px-6 xl:px-8 mt-6 sm:mt-8 lg:mt-10 xl:mt-12">
        {imagesRow2.map((image, index) => (
          <div
            key={index + 3}
            className="relative aspect-square overflow-hidden  group cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index + 3)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className="w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300">
              {/* Overlay Content Container */}
              <div className="absolute inset-x-0 bottom-0 p-3 xs:p-4 sm:p-5 lg:p-6 transform transition-all duration-300 group-hover:translate-y-0">
                <div className="relative">
                  {/* Title with Background on Mobile */}
                  <div className="inline-block">
                    <h4 className="text-lg xs:text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-semibold text-white">
                      {image.title}
                    </h4>
                    <div className="h-0.5 xs:h-1 w-full bg-white mt-1 xs:mt-2 transform origin-left transition-all duration-300 group-hover:scale-x-100 scale-x-0"></div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-white/90 mt-2 xs:mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>

          
          </div>
        ))}
      </div>
    </>
  );
};

export default Celebrate1;