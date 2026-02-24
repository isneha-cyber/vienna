import React, { useState, useEffect, useMemo } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Navbar from '@/Components/LandingPage/Navbar';
import Social from '@/Components/LandingPage/Social';
import StellaFooter from '@/Components/LandingPage/Footer';

// API endpoint for data fetching
const API_BASE = `${window.location.origin}/api/myrooms`;

const Accomodation1 = ({ rooms: initialRooms }) => {
  const [rooms, setRooms] = useState(initialRooms || []);
  const [loading, setLoading] = useState(!initialRooms);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    // If rooms weren't passed as props, fetch them
    if (!initialRooms) {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter options
  const filterOptions = [
    { value: 'overwater', label: 'Overwater Bungalows',  filterFn: (room) => room.category?.toLowerCase() === 'overwater' },
    { value: 'swimup',    label: 'Swim-Up Rooms',         filterFn: (room) => room.category?.toLowerCase() === 'swimup' },
    { value: 'jacuzzi',   label: 'With Jacuzzi',          filterFn: (room) => room.amenities?.some(a => a.toLowerCase().includes('jacuzzi')) },
    { value: 'family',    label: 'Family-Friendly',       filterFn: (room) => room.guests?.toLowerCase().includes('4 guests') },
  ];

  const filteredRooms = useMemo(() => {
    if (!selectedFilter) return rooms;
    const selectedOption = filterOptions.find(o => o.value === selectedFilter);
    return selectedOption ? rooms.filter(selectedOption.filterFn) : rooms;
  }, [rooms, selectedFilter]);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const initialIndices = {};
    filteredRooms.forEach((room) => { initialIndices[room.id] = 0; });
    setCurrentImageIndex(initialIndices);
  }, [filteredRooms]);

  const handlePrev = (roomId, totalImages) => {
    setCurrentImageIndex(prev => ({ ...prev, [roomId]: (prev[roomId] - 1 + totalImages) % totalImages }));
  };

  const handleNext = (roomId, totalImages) => {
    setCurrentImageIndex(prev => ({ ...prev, [roomId]: (prev[roomId] + 1) % totalImages }));
  };

  const clearFilter = () => setSelectedFilter('');

  if (loading) {
    return (
      <>
        <Navbar textColor="black" />
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
        <Social />
        <StellaFooter />
      </>
    );
  }

  return (
    <>
      <Navbar textColor="black" />

      {/* Header Section */}
      <div className="px-8 md:px-16 lg:px-32 py-12 mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
        <h3 className="text-4xl md:text-5xl font-bold text-neutral-900">Stella Island Accommodation</h3>
        <p className="text-lg md:text-xl text-neutral-700">
          There are {rooms.length} elegant rooms and villas offering luxury services and a variety of
          restaurants aiming to indulge your senses.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="px-8 md:px-16 lg:px-24 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="border-t-2 border-gray-300 col-span-2"></div>
          <div className="flex flex-wrap items-center justify-center gap-2 col-span-1">
            <h3 className="font-medium whitespace-nowrap">Filter by:</h3>
            <div className="relative">
              <select
                className="appearance-none border border-gray-400 bg-white text-gray-700 py-2 px-4 pr-8
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="">ALL ROOMS</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {selectedFilter && (
              <button onClick={clearFilter} className="text-sm text-gray-600 hover:text-gray-900 underline ml-2">
                Clear
              </button>
            )}
          </div>
        </div>
        {selectedFilter && (
          <div className="text-sm text-gray-600 mt-4 text-center md:text-right">
            Showing {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'}
          </div>
        )}
      </div>

      {/* Room Cards */}
      <div className="px-8 md:px-16 lg:px-24 mb-16">
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredRooms.map((room) => {
              const currentIndex = currentImageIndex[room.id] || 0;
              const roomImages = room.images || [];
              const totalImages = roomImages.length;

              return (
                <div key={room.id} className="bg-white overflow-hidden group">
                  {/* Image Container */}
                  <div className="relative w-full h-64 lg:h-96 overflow-hidden">
                    <img
                      src={roomImages[currentIndex] || 'https://via.placeholder.com/800x600?text=No+Image'}
                      alt={`${room.title} - View ${currentIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'; }}
                    />
                    <div className="absolute top-4 left-4 text-white text-7xl md:text-8xl lg:text-9xl font-bold opacity-50 pointer-events-none">
                      {room.number}
                    </div>
                    {totalImages > 1 && (
                      <>
                        <div className="absolute bottom-4 right-4 flex space-x-2">
                          <button
                            onClick={(e) => { e.preventDefault(); handlePrev(room.id, totalImages); }}
                            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition transform hover:scale-110"
                            aria-label="Previous image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); handleNext(room.id, totalImages); }}
                            className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition transform hover:scale-110"
                            aria-label="Next image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                        <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          {currentIndex + 1} / {totalImages}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Room Details */}
                  <div className="p-5 md:p-6">
                    <h4 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">{room.title}</h4>
                    <div className="flex flex-wrap gap-y-2 mb-4 text-sm text-gray-600">
                      {room.area && (
                        <div className="flex items-center mr-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h-2M7 21h2m-2 0h-2m-2 0h-2" />
                          </svg>
                          {room.area}
                        </div>
                      )}
                      {room.guests && (
                        <div className="flex items-center mr-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1c0-1.268.63-2.39 1.593-3.068a3.995 3.995 0 117.8 0c1.593.678 2.407 1.8 2.407 3.068z" />
                          </svg>
                          {room.guests}
                        </div>
                      )}
                      {room.deck_info && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {room.deck_info}
                        </div>
                      )}
                    </div>
                    {room.amenities && room.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.slice(0, 3).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{amenity}</span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            +{room.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://stellaisland.reserve-online.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition"
                      >
                        BOOK NOW
                      </a>
                      <Link
                        href={`/accommodation/${room.slug}`}
                        className="border border-gray-300 text-gray-800 px-6 py-2 font-medium hover:bg-gray-50 transition"
                      >
                        MORE INFO
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No rooms found</h3>
            <p className="text-gray-500 mb-6">No rooms match your selected filter criteria.</p>
            <button onClick={clearFilter} className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition">
              CLEAR FILTER
            </button>
          </div>
        )}
      </div>

      <Social />
      <StellaFooter />
    </>
  );
};

export default Accomodation1;