import React, { useState } from 'react';

const BookingForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [nights, setNights] = useState(1);

  const handleAdultsChange = (increment) => {
    setAdults(prev => Math.max(1, prev + increment));
  };

  const handleNightsChange = (increment) => {
    setNights(prev => Math.max(1, prev + increment));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Check-in:', checkInDate);
    console.log('Adults:', adults);
    console.log('Nights:', nights);
  };

  return (
    <>
    <div className="border-t border-gray-300 py-6 max-w-7xl mx-auto"></div>
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Best Rates Guaranteed</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Book directly with us.</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Check-in Field */}
          <div className="flex flex-col">
            <label htmlFor="check-in" className="text-sm font-medium text-gray-700 mb-2">Check-in</label>
            <input
              id="check-in"
              type="text"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              placeholder=""
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Adults Field */}
          <div className="flex flex-col">
            <label htmlFor="adults" className="text-sm font-medium text-gray-700 mb-2">Adults</label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 py-2 flex-1">{adults} Adult{adults !== 1 ? 's' : ''}</span>
              <button
                type="button"
                onClick={() => handleAdultsChange(-1)}
                className="bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors"
                aria-label="Decrease adults"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => handleAdultsChange(1)}
                className="bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors"
                aria-label="Increase adults"
              >
                +
              </button>
            </div>
          </div>

          {/* Nights Field */}
          <div className="flex flex-col">
            <label htmlFor="nights" className="text-sm font-medium text-gray-700 mb-2">Nights</label>
            <div className="flex items-center border border-gray-300 rounded">
              <span className="px-3 py-2 flex-1">{nights} Night{nights !== 1 ? 's' : ''}</span>
              <button
                type="button"
                onClick={() => handleNightsChange(-1)}
                className="bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors"
                aria-label="Decrease nights"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => handleNightsChange(1)}
                className="bg-black text-white px-3 py-2 hover:bg-gray-800 transition-colors"
                aria-label="Increase nights"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Check Availability
          </button>
        </div>
      </form>

       
    </div> 
   <div className="border-t border-gray-300  max-w-7xl mx-auto mt-20"></div>    
    </>
  );
};

export default BookingForm;