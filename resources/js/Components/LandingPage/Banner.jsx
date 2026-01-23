import React from 'react';

const Banner = () => {
  const platforms = [
    { name: 'Booking.com', score: '9.5' },
    { name: 'Hotels.com', score: '9.6' },
    { name: 'Expedia', score: '9.6' }
  ];

  return (
    <>
    <div className="text-white bg-black py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Platform Ratings */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {platforms.map((platform, i) => (
            <div key={i} className="text-center p-4 ">
                
              <div className=" text-base sm:text-sm mb-2">{platform.name}</div>
              <div className="text-lg sm:text-2xl font-semibold ">{platform.score}/10</div>
            </div>
          ))}
        </div>

      </div>
    </div>
   
    </>
  );
};

export default Banner;