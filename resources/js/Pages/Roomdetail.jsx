// import React, { useState, useEffect } from 'react';
// import { usePage, Link } from '@inertiajs/react';
// import Navbar from '@/Components/LandingPage/Navbar';
// import BookingForm from '@/Components/BookingForm';
// import Social from '@/Components/LandingPage/Social';
// import StellaFooter from '@/Components/LandingPage/Footer';

// // Import your rooms data
// import roomsData from '../data/rooms.json';

// const Roomdetail = ({ slug }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   // Get the slug from Inertia page props
//   const { props } = usePage();
//   const roomSlug = slug || props?.slug;
  
//   // Use the rooms data from JSON
//   const rooms = roomsData.map(room => ({
//     id: parseInt(room.number),
//     number: room.number,
//     name: room.title,
//     slug: room.slug,
//     image: room.images?.[0] || "https://stellaisland.gr/wp-content/uploads/2026/01/nest2-456x582.jpg",
//     size: room.area,
//     beds: `${room.guests}, ${room.bedInfo}`,
//     feature: room.deckInfo,
//     link: `/accommodation/${room.slug}`,
//     description: room.description,
//     price: room.price
//   }));

//   // Find the current room based on slug
//   const currentRoom = rooms.find(room => room.slug === roomSlug) || rooms[0];

//   useEffect(() => {
//     // Update current index when slug changes
//     const roomIndex = rooms.findIndex(room => room.slug === roomSlug);
//     if (roomIndex !== -1) {
//       setCurrentIndex(roomIndex);
//     }
//   }, [roomSlug, rooms]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % rooms.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
//   };

//   // Get visible rooms based on screen size
//   const getVisibleRooms = () => {
//     const visibleCount = 3;
//     const visible = [];
    
//     for (let i = 0; i < visibleCount; i++) {
//       visible.push(rooms[(currentIndex + i) % rooms.length]);
//     }
    
//     return visible;
//   };

//   const visibleRooms = getVisibleRooms();

//   return (
//     <>
//       <Navbar textColor="black" />
      
//       {/* Page Header/Breadcrumb Section */}
//       <div className="pb-8 px-4 sm:px-6 lg:px-24 mt-24 sm:mt-28">
//         <div className="border-t border-gray-300 mb-4 sm:mb-6"></div>
//         <nav className="text-sm sm:text-base max-w-7xl mx-auto">
//           <ol className="flex items-center space-x-1">
//             <li className="text-gray-600 hover:text-gray-900 transition-colors">
//               <a href="/">Home</a>
//             </li>
//             <li className="text-gray-400">
//               <span className="mx-1 sm:mx-2">/</span>
//             </li>
//             <li className="text-gray-900 font-medium leading-snug">
//               Accomodation Details
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* Hero Title */}
//       <div className="text-center px-4 mb-6 sm:mb-8 lg:mb-0">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif tracking-wide">
//           {currentRoom.name}
//         </h1>
//       </div>

//       {/* Hero Image */}
//       <div className="relative sm:-mt-24 mt-12 ">
//         <div className="absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-24">
//           <div className="max-w-6xl mx-auto">
//             <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm shadow-xl lg:shadow-2xl">
//               <img 
//                 src={currentRoom.image} 
//                 alt={currentRoom.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[700px]"></div>
//       </div>

//       {/* Content Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        
//         {/* Left Column */}
//         <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 bg-white pt-24 sm:pt-32 lg:pt-48">
          
//           {/* Room Overview */}
//           <div className="mb-8 sm:mb-12 lg:mb-20">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">
//               Room Overview
//             </h2>
//             <div className="space-y-3 sm:space-y-4 text-gray-700">
//               <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
//                 {currentRoom.description || "Experience luxury accommodation with premium amenities and stunning views."}
//               </p>
//             </div>
//           </div>

//           {/* Facilities & Services */}
//           <div>
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">
//               Facilities & Services
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//               <ul className="space-y-2 sm:space-y-2.5">
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Bath Amenities</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Bathrobes and slippers</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Cable-Satellite TV</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Coffee Facilities Nespresso machine</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Daily Maid Service</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Hairdryer</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- In room safe deposit box</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Iron & Iron Board Upon Request</li>
//               </ul>
//               <ul className="space-y-2 sm:space-y-2.5">
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Laundry and ironing service</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Outdoor Jacuzzi</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Pool Towels</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Private Wooden Deck with Hammock</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Turn down service</li>
//                 <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Welcome Drink</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="bg-[#eaeaea] bg-fixed pt-24 ">
//           <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 lg:sticky lg:top-28">
          
//             {/* Book Directly CTA */}
//             <div className="mb-6 sm:mb-8">
//               <button className="w-full sm:w-auto bg-black text-white uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-900 transition-colors duration-300">
//                 Book Directly With Us
//               </button>
//             </div>

//             {/* Room Specifications */}
//             <div className="space-y-4 sm:space-y-6">
              
//               {/* Size */}
//               <div className="flex items-start space-x-3 sm:space-x-4">
//                 <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
//                     {currentRoom.size}
//                   </p>
//                 </div>
//               </div>

//               {/* Guests */}
//               <div className="flex items-start space-x-3 sm:space-x-4">
//                 <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm sm:text-base lg:text-lg text-gray-700">
//                     {currentRoom.beds}
//                   </p>
//                 </div>
//               </div>

//               {/* Deck Access */}
//               <div className="flex items-start space-x-3 sm:space-x-4">
//                 <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm sm:text-base lg:text-lg text-gray-700">
//                     {currentRoom.feature}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Spacing */}
//       <div className="h-8 sm:h-12 lg:h-20"></div>
      
//       <BookingForm/>

//       {/* Room Carousel Section */}
//       <div className="w-full bg-white py-8 sm:py-12 lg:py-20">
//         {/* Section Header */}
//         <div className="text-center mb-6 sm:mb-8 lg:mb-16 px-4">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-3 sm:mb-4">
//             More Room Types
//           </h2>
//           <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
//             Choose your favorite room type and enjoy your vacation at Stella Island.
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative px-2 sm:px-4 lg:px-12">
          
//           {/* Desktop/Tablet - 3 Cards */}
//           <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
//             {visibleRooms.map((room) => (
//               <div key={room.id} className="group">
//                 <div className="bg-white overflow-hidden transition-all duration-300">
                  
//                   {/* Image */}
//                   <div className="relative aspect-[456/582] overflow-hidden">
//                     <img 
//                       src={room.image} 
//                       alt={room.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     />
//                     <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
//                       <span className="text-white text-4xl lg:text-5xl xl:text-6xl font-light opacity-80">
//                         {room.number}
//                       </span>
//                     </div>
//                     <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
//                       <h5 className="text-white text-lg lg:text-xl xl:text-2xl font-serif leading-tight">
//                         {room.name}
//                       </h5>
//                     </div>
//                   </div>

//                   {/* Details */}
//                   <div className="p-4 lg:p-6 space-y-2 lg:space-y-3 border-b border-gray-200">
//                     <div className="flex items-center text-gray-700">
//                       <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                       </svg>
//                       <span className="text-sm lg:text-base">{room.size}</span>
//                     </div>
//                     <div className="flex items-start text-gray-700">
//                       <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       <span className="text-xs lg:text-sm">{room.beds}</span>
//                     </div>
//                     <div className="flex items-start text-gray-700">
//                       <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                       </svg>
//                       <span className="text-xs lg:text-sm">{room.feature}</span>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="p-4 lg:p-6 flex gap-2 lg:gap-3">
//                     <Link 
//                       href={room.link}
//                       className="flex-1 text-center px-3 py-2 lg:px-6 lg:py-3 border-2 border-black text-black font-medium text-xs lg:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
//                     >
//                       More Info
//                     </Link>
//                     <a 
//                       href="https://stellaisland.reserve-online.net/"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex-1 text-center px-3 py-2 lg:px-6 lg:py-3 bg-black text-white font-medium text-xs lg:text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
//                     >
//                       Book Now
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Mobile - Single Card */}
//           <div className="md:hidden max-w-sm mx-auto">
//             <div className="bg-white overflow-hidden shadow-lg">
              
//               {/* Image */}
//               <div className="relative aspect-[456/582] overflow-hidden">
//                 <img 
//                   src={rooms[currentIndex].image} 
//                   alt={rooms[currentIndex].name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 left-4">
//                   <span className="text-white text-4xl sm:text-5xl font-light opacity-80">
//                     {rooms[currentIndex].number}
//                   </span>
//                 </div>
//                 <div className="absolute bottom-4 left-4 right-4">
//                   <h5 className="text-white text-lg sm:text-xl font-serif leading-tight">
//                     {rooms[currentIndex].name}
//                   </h5>
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="p-4 sm:p-6 space-y-3 border-b border-gray-200">
//                 <div className="flex items-center text-gray-700">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
//                   </svg>
//                   <span className="text-sm sm:text-base">{rooms[currentIndex].size}</span>
//                 </div>
//                 <div className="flex items-start text-gray-700">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                   <span className="text-sm">{rooms[currentIndex].beds}</span>
//                 </div>
//                 <div className="flex items-start text-gray-700">
//                   <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
//                   </svg>
//                   <span className="text-sm">{rooms[currentIndex].feature}</span>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
//                 <Link 
//                   href={rooms[currentIndex].link}
//                   className="flex-1 text-center px-6 py-3 border-2 border-black text-black font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
//                 >
//                   More Info
//                 </Link>
//                 <a 
//                   href="https://stellaisland.reserve-online.net/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 text-center px-6 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
//                 >
//                   Book Now
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all"
//             aria-label="Previous"
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all"
//             aria-label="Next"
//           >
//             <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* Dots - Mobile Only */}
//           <div className="flex justify-center gap-2 mt-6 md:hidden">
//             {rooms.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`h-2 rounded-full transition-all ${
//                   index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <Social/>
//       <StellaFooter/>
//     </>
//   );
// };

// export default Roomdetail;

import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import Navbar from '@/Components/LandingPage/Navbar';
import BookingForm from '@/Components/BookingForm';
import Social from '@/Components/LandingPage/Social';
import StellaFooter from '@/Components/LandingPage/Footer';

// API endpoint for data fetching
const API_BASE = `${window.location.origin}/api/myrooms`;

const Roomdetail = ({ room }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const fetchAllRooms = async () => {
    try {
      const response = await axios.get(API_BASE);
      setRooms(response.data.data || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % rooms.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);

  const getVisibleRooms = () => {
    const visibleCount = 3;
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(rooms[(currentIndex + i) % rooms.length]);
    }
    return visible;
  };

  const visibleRooms = getVisibleRooms();

  if (!room) {
    return (
      <>
        <Navbar textColor="black" />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center py-32">
            <h2 className="text-2xl text-gray-600">Room not found</h2>
          </div>
        </div>
        <Social />
        <StellaFooter />
      </>
    );
  }

  return (
    <>
      <Navbar textColor="black" />

      {/* Breadcrumb */}
      <div className="pb-8 px-4 sm:px-6 lg:px-24 mt-24 sm:mt-28">
        <div className="border-t border-gray-300 mb-4 sm:mb-6"></div>
        <nav className="text-sm sm:text-base max-w-7xl mx-auto">
          <ol className="flex items-center space-x-1">
            <li className="text-gray-600 hover:text-gray-900 transition-colors"><a href="/">Home</a></li>
            <li className="text-gray-400"><span className="mx-1 sm:mx-2">/</span></li>
            <li className="text-gray-900 font-medium"><a href="/accomodation">Accommodation</a></li>
            <li className="text-gray-400"><span className="mx-1 sm:mx-2">/</span></li>
            <li className="text-gray-900 font-medium leading-snug">{room.title}</li>
          </ol>
        </nav>
      </div>

      {/* Hero Title */}
      <div className="text-center px-4 mb-6 sm:mb-8 lg:mb-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif tracking-wide">
          {room.title}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative sm:-mt-24 mt-12">
        <div className="absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm shadow-xl lg:shadow-2xl">
              <img
                src={room.images?.[0] || 'https://via.placeholder.com/1200x800?text=No+Image'}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[700px]"></div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Left Column */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 bg-white pt-24 sm:pt-32 lg:pt-48">
          <div className="mb-8 sm:mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">Room Overview</h2>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
              {room.description || 'Experience luxury accommodation with premium amenities and stunning views.'}
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">Facilities & Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {room.amenities && room.amenities.length > 0 ? (
                room.amenities.map((amenity, index) => (
                  <li key={index} className="text-sm sm:text-base lg:text-lg text-gray-700">- {amenity}</li>
                ))
              ) : (
                <>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Bath Amenities</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Bathrobes and slippers</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Cable-Satellite TV</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Coffee Facilities Nespresso machine</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Daily Maid Service</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Hairdryer</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- In room safe deposit box</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Iron & Iron Board Upon Request</li>
                  </ul>
                  <ul className="space-y-2 sm:space-y-2.5">
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Laundry and ironing service</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Outdoor Jacuzzi</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Pool Towels</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Private Wooden Deck with Hammock</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Turn down service</li>
                    <li className="text-sm sm:text-base lg:text-lg text-gray-700">- Welcome Drink</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#eaeaea] bg-fixed pt-24">
          <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 lg:sticky lg:top-28">
            <div className="mb-6 sm:mb-8">
              <a
                href="https://stellaisland.reserve-online.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-black text-white uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-900 transition-colors duration-300 inline-block text-center"
              >
                Book Directly With Us
              </a>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {room.area && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">{room.area}</p>
                </div>
              )}
              {(room.guests || room.bed_info) && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">{room.guests}{room.bed_info ? `, ${room.bed_info}` : ''}</p>
                </div>
              )}
              {room.deck_info && (
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">{room.deck_info}</p>
                </div>
              )}
              {room.price && (
                <div className="pt-4">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{room.price}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 sm:h-12 lg:h-20"></div>
      <BookingForm />

      {/* Room Carousel Section */}
      <div className="w-full bg-white py-8 sm:py-12 lg:py-20">
        <div className="text-center mb-6 sm:mb-8 lg:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-3 sm:mb-4">More Room Types</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your favorite room type and enjoy your vacation at Stella Island.
          </p>
        </div>

        <div className="relative px-2 sm:px-4 lg:px-12">
          {/* Desktop - 3 Cards */}
          {rooms.length > 0 && (
            <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
              {visibleRooms.map((roomItem) => roomItem && (
                <div key={roomItem.id} className="group">
                  <div className="bg-white overflow-hidden transition-all duration-300">
                    <div className="relative aspect-[456/582] overflow-hidden">
                      <img
                        src={roomItem.images?.[0] || 'https://via.placeholder.com/456x582?text=No+Image'}
                        alt={roomItem.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                        <span className="text-white text-4xl lg:text-5xl xl:text-6xl font-light opacity-80">{roomItem.number}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
                        <h5 className="text-white text-lg lg:text-xl xl:text-2xl font-serif leading-tight">{roomItem.title}</h5>
                      </div>
                    </div>
                    <div className="p-4 lg:p-6 space-y-2 lg:space-y-3 border-b border-gray-200">
                      {roomItem.area && (
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          <span className="text-sm lg:text-base">{roomItem.area}</span>
                        </div>
                      )}
                      <div className="flex items-start text-gray-700">
                        <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-xs lg:text-sm">{roomItem.guests}{roomItem.bed_info ? `, ${roomItem.bed_info}` : ''}</span>
                      </div>
                      {roomItem.deck_info && (
                        <div className="flex items-start text-gray-700">
                          <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <span className="text-xs lg:text-sm">{roomItem.deck_info}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 lg:p-6 flex gap-2 lg:gap-3">
                      <Link
                        href={`/accommodation/${roomItem.slug}`}
                        className="flex-1 text-center px-3 py-2 lg:px-6 lg:py-3 border-2 border-black text-black font-medium text-xs lg:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                      >
                        More Info
                      </Link>
                      <a
                        href="https://stellaisland.reserve-online.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 lg:px-6 lg:py-3 bg-black text-white font-medium text-xs lg:text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
                      >
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mobile - Single Card */}
          {rooms.length > 0 && (
            <div className="md:hidden max-w-sm mx-auto">
              <div className="bg-white overflow-hidden shadow-lg">
                <div className="relative aspect-[456/582] overflow-hidden">
                  <img
                    src={rooms[currentIndex]?.images?.[0] || 'https://via.placeholder.com/456x582?text=No+Image'}
                    alt={rooms[currentIndex]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-white text-4xl sm:text-5xl font-light opacity-80">{rooms[currentIndex]?.number}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h5 className="text-white text-lg sm:text-xl font-serif leading-tight">{rooms[currentIndex]?.title}</h5>
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-3 border-b border-gray-200">
                  <div className="flex items-center text-gray-700">
                    <span className="text-sm sm:text-base">{rooms[currentIndex]?.area}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <span className="text-sm">{rooms[currentIndex]?.guests}{rooms[currentIndex]?.bed_info ? `, ${rooms[currentIndex]?.bed_info}` : ''}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/accommodation/${rooms[currentIndex]?.slug}`}
                    className="flex-1 text-center px-6 py-3 border-2 border-black text-black font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    More Info
                  </Link>
                  <a
                    href="https://stellaisland.reserve-online.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {rooms.length > 3 && (
            <>
              <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all" aria-label="Previous">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all" aria-label="Next">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <Social />
      <StellaFooter />
    </>
  );
};

export default Roomdetail;