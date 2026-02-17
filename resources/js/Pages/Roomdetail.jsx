// import React from 'react';
// import { useState } from 'react';
// import Navbar from '@/Components/LandingPage/Navbar';
// import BookingForm from '@/Components/BookingForm';
// import Social from '@/Components/LandingPage/Social';
// import StellaFooter from '@/Components/LandingPage/Footer';


// const Roomdetail = () => {
	
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const rooms = [
//     {
//       id: 1,
//       number: "01",
//       name: "Overwater Nest",
//       image: "https://stellaisland.gr/wp-content/uploads/2026/01/nest2-456x582.jpg",
//       size: "31m²",
//       beds: "Up to 2 guests, 1 double-size bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/overwater-nest/"
//     },
//     {
//       id: 2,
//       number: "02",
//       name: "Overwater Bungalow",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/09/drz-stella-island_5713-456x582.jpg",
//       size: "25m²",
//       beds: "Up to 2 guests, 1 double-size bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/overwater-bungalow/"
//     },
//     {
//       id: 3,
//       number: "03",
//       name: "Grand Overwater Bungalow with Jacuzzi",
//       image: "https://stellaisland.gr/wp-content/uploads/2025/10/drz-stella-island_5345-456x582.jpg",
//       size: "39m²",
//       beds: "Up to 3 guests, 1 king-size bed and 1 sofa bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/grand-overwater-bungalow-with-jacuzzi/"
//     },
//     {
//       id: 4,
//       number: "04",
//       name: "Swim-Up Maisonette",
//       image: "https://stellaisland.gr/wp-content/uploads/2026/01/MAIS-456x582.jpg",
//       size: "67m²",
//       beds: "Up to 4 guests, 1 king size bed & 1 sofa bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/swim-up-maisonette/"
//     },
//     {
//       id: 5,
//       number: "05",
//       name: "Signature Island Villa",
//       image: "https://stellaisland.gr/wp-content/uploads/2026/01/SIGNATURE-VILLA-456x582.jpg",
//       size: "140m²",
//       beds: "Up to 6 guests, 2 king size beds & 1 sofa bed",
//       feature: "Direct access to individual pool",
//       link: "/accommodation/signature-island-villa/"
//     },
//     {
//       id: 6,
//       number: "06",
//       name: "Island Villa Private Pool",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/09/drz-stella-island_5373-456x582.jpg",
//       size: "35m²",
//       beds: "Up to 2 guests, 1 king-size bed",
//       feature: "Private terrace with direct access to private pool",
//       link: "/accommodation/island-villa-private-pool/"
//     },
//     {
//       id: 7,
//       number: "07",
//       name: "Premium Swim up",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/09/drz-stella-island_5742-456x582.jpg",
//       size: "34m²",
//       beds: "Up to 3 guests, 1 king-size bed or 2 single beds and 1 sofa bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/premium-swim-up/"
//     },
//     {
//       id: 8,
//       number: "08",
//       name: "Luxury Swim up",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/11/drz-stella-island_6584-456x582.jpg",
//       size: "27m²",
//       beds: "Up to 2 guests, 1 double-size bed",
//       feature: "Wooden deck with direct access to lagoon pool",
//       link: "/accommodation/luxury-swim-up/"
//     },
//     {
//       id: 9,
//       number: "09",
//       name: "Premium Pool View with an Exterior Jacuzzi",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/11/drz-stella-island_5275-1-456x582.jpg",
//       size: "34m²",
//       beds: "Up to 3 guests, 1 king-size bed or two single beds and 1 sofa bed",
//       feature: "Balcony with view to lagoon pool",
//       link: "/accommodation/premium-pool-view-with-an-exterior-jacuzzi/"
//     },
//     {
//       id: 10,
//       number: "10",
//       name: "Premium Pool View with Steam Bath",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/11/drz-stella-island_6651-456x582.jpg",
//       size: "34m²",
//       beds: "Up to 3 guests, 1 king-size bed or 2 single beds and 1 sofa bed",
//       feature: "Balcony with view to lagoon pool",
//       link: "/accommodation/premium-pool-view-with-steam-bath/"
//     },
//     {
//       id: 11,
//       number: "11",
//       name: "Premium Pool View",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/11/drz-stella-island_5275-456x582.jpg",
//       size: "34m²",
//       beds: "Up to 3 guests, 1 king-size bed or 2 single beds and 1 sofa bed",
//       feature: "Balcony with view to lagoon pool",
//       link: "/accommodation/premium-pool-view/"
//     },
//     {
//       id: 12,
//       number: "12",
//       name: "Luxury Pool View",
//       image: "https://stellaisland.gr/wp-content/uploads/2022/11/drz-stella-island_6163-456x582.jpg",
//       size: "27m²",
//       beds: "Up to 2 guests, 1 double-size bed",
//       feature: "Balcony with view to lagoon pool",
//       link: "/accommodation/luxury-pool-view/"
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev + 1) % rooms.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
//   };

//   // Get visible rooms based on screen size
//   const getVisibleRooms = () => {
//     const visibleCount = 3;
//     const rooms_copy = [...rooms];
//     const visible = [];
    
//     for (let i = 0; i < visibleCount; i++) {
//       visible.push(rooms_copy[(currentIndex + i) % rooms.length]);
//     }
    
//     return visible;
//   };

 
//   return (
//     <>
//       <Navbar textColor="black" />
      
//              {/* Page Header/Breadcrumb Section */}
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
//               Accomodation
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* Hero Title - Responsive */}
//       <div className="text-center px-4 mb-6 sm:mb-8 lg:mb-0">
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif tracking-wide">
//           Overwater Nest
//         </h1>
//       </div>

//       {/* Hero Image - Responsive Positioning */}
//       <div className="relative sm:-mt-24 mt-12 ">
//         <div className="absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-24">
//           <div className="max-w-6xl mx-auto">
//             <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm shadow-xl lg:shadow-2xl">
//               <img 
//                 src="/images/detail1.jpg" 
//                 alt="Overwater Nest Room Interior"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[700px]"></div>
//       </div>

//       {/* Content Section - Responsive Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        
//         {/* Left Column - Responsive Padding & Typography */}
//         <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 bg-white pt-24 sm:pt-32 lg:pt-48">
          
//           {/* Room Overview */}
//           <div className="mb-8 sm:mb-12 lg:mb-20">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">
//               Room Overview
//             </h2>
//             <div className="space-y-3 sm:space-y-4 text-gray-700">
//               <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
//                 The new Overwater Nest brings a fresh architectural icon to Stella Island, 
//                 an elegant, sculptural retreat positioned above the lagoon. Inside, calming 
//                 natural tones and soft, curved lines create a warm, cocoon-like atmosphere. 
//                 Outside, a generous deck with loungers and a curved outdoor jacuzzi invites 
//                 slow, sunlit moments over the water.
//               </p>
//               <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
//                 Designed for guests seeking a refined and unique overwater experience, this 
//                 new room type captures the essence of Stella Island's elevated island living.
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

//         {/* Right Column - Responsive Sticky Card */}
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
//                     31m²
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
//                     Up to 2 guests, 1 double-size bed
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
//                     Wooden deck with direct access to lagoon pool
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

//       {/* Room Carousel Section - Fully Responsive */}
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
//             {getVisibleRooms().map((room) => (
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
//                       <span className="text-sm lg:text-base" dangerouslySetInnerHTML={{ __html: room.size }}></span>
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
//                     <a 
//                       href={room.link}
//                       className="flex-1 text-center px-3 py-2 lg:px-6 lg:py-3 border-2 border-black text-black font-medium text-xs lg:text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-300"
//                     >
//                       More Info
//                     </a>
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
//                   <span className="text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: rooms[currentIndex].size }}></span>
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
//                 <a 
//                   href={rooms[currentIndex].link}
//                   className="flex-1 text-center px-6 py-3 border-2 border-black text-black font-medium text-sm uppercase tracking-wider"
//                 >
//                   More Info
//                 </a>
//                 <a 
//                   href="https://stellaisland.reserve-online.net/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex-1 text-center px-6 py-3 bg-black text-white font-medium text-sm uppercase tracking-wider"
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
import { usePage, Link } from '@inertiajs/react';
import Navbar from '@/Components/LandingPage/Navbar';
import BookingForm from '@/Components/BookingForm';
import Social from '@/Components/LandingPage/Social';
import StellaFooter from '@/Components/LandingPage/Footer';

// Import your rooms data
import roomsData from '../data/rooms.json';

const Roomdetail = ({ slug }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get the slug from Inertia page props
  const { props } = usePage();
  const roomSlug = slug || props?.slug;
  
  // Use the rooms data from JSON
  const rooms = roomsData.map(room => ({
    id: parseInt(room.number),
    number: room.number,
    name: room.title,
    slug: room.slug,
    image: room.images?.[0] || "https://stellaisland.gr/wp-content/uploads/2026/01/nest2-456x582.jpg",
    size: room.area,
    beds: `${room.guests}, ${room.bedInfo}`,
    feature: room.deckInfo,
    link: `/accommodation/${room.slug}`,
    description: room.description,
    price: room.price
  }));

  // Find the current room based on slug
  const currentRoom = rooms.find(room => room.slug === roomSlug) || rooms[0];

  useEffect(() => {
    // Update current index when slug changes
    const roomIndex = rooms.findIndex(room => room.slug === roomSlug);
    if (roomIndex !== -1) {
      setCurrentIndex(roomIndex);
    }
  }, [roomSlug, rooms]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rooms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  // Get visible rooms based on screen size
  const getVisibleRooms = () => {
    const visibleCount = 3;
    const visible = [];
    
    for (let i = 0; i < visibleCount; i++) {
      visible.push(rooms[(currentIndex + i) % rooms.length]);
    }
    
    return visible;
  };

  const visibleRooms = getVisibleRooms();

  return (
    <>
      <Navbar textColor="black" />
      
      {/* Page Header/Breadcrumb Section */}
      <div className="pb-8 px-4 sm:px-6 lg:px-24 mt-24 sm:mt-28">
        <div className="border-t border-gray-300 mb-4 sm:mb-6"></div>
        <nav className="text-sm sm:text-base max-w-7xl mx-auto">
          <ol className="flex items-center space-x-1">
            <li className="text-gray-600 hover:text-gray-900 transition-colors">
              <a href="/">Home</a>
            </li>
            <li className="text-gray-400">
              <span className="mx-1 sm:mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium leading-snug">
              Accomodation Details
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Title */}
      <div className="text-center px-4 mb-6 sm:mb-8 lg:mb-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif tracking-wide">
          {currentRoom.name}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative sm:-mt-24 mt-12 ">
        <div className="absolute -bottom-16 sm:-bottom-24 lg:-bottom-32 left-1/2 transform -translate-x-1/2 z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden rounded-sm shadow-xl lg:shadow-2xl">
              <img 
                src={currentRoom.image} 
                alt={currentRoom.name}
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
          
          {/* Room Overview */}
          <div className="mb-8 sm:mb-12 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">
              Room Overview
            </h2>
            <div className="space-y-3 sm:space-y-4 text-gray-700">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                {currentRoom.description || "Experience luxury accommodation with premium amenities and stunning views."}
              </p>
            </div>
          </div>

          {/* Facilities & Services */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6 lg:mb-8">
              Facilities & Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#eaeaea] bg-fixed pt-24 ">
          <div className="px-4 sm:px-6 lg:px-16 xl:px-32 py-8 sm:py-12 lg:py-20 lg:sticky lg:top-28">
          
            {/* Book Directly CTA */}
            <div className="mb-6 sm:mb-8">
              <button className="w-full sm:w-auto bg-black text-white uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-gray-900 transition-colors duration-300">
                Book Directly With Us
              </button>
            </div>

            {/* Room Specifications */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Size */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium">
                    {currentRoom.size}
                  </p>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    {currentRoom.beds}
                  </p>
                </div>
              </div>

              {/* Deck Access */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700">
                    {currentRoom.feature}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="h-8 sm:h-12 lg:h-20"></div>
      
      <BookingForm/>

      {/* Room Carousel Section */}
      <div className="w-full bg-white py-8 sm:py-12 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif mb-3 sm:mb-4">
            More Room Types
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your favorite room type and enjoy your vacation at Stella Island.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-2 sm:px-4 lg:px-12">
          
          {/* Desktop/Tablet - 3 Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
            {visibleRooms.map((room) => (
              <div key={room.id} className="group">
                <div className="bg-white overflow-hidden transition-all duration-300">
                  
                  {/* Image */}
                  <div className="relative aspect-[456/582] overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                      <span className="text-white text-4xl lg:text-5xl xl:text-6xl font-light opacity-80">
                        {room.number}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
                      <h5 className="text-white text-lg lg:text-xl xl:text-2xl font-serif leading-tight">
                        {room.name}
                      </h5>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 lg:p-6 space-y-2 lg:space-y-3 border-b border-gray-200">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="text-sm lg:text-base">{room.size}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-xs lg:text-sm">{room.beds}</span>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span className="text-xs lg:text-sm">{room.feature}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="p-4 lg:p-6 flex gap-2 lg:gap-3">
                    <Link 
                      href={room.link}
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

          {/* Mobile - Single Card */}
          <div className="md:hidden max-w-sm mx-auto">
            <div className="bg-white overflow-hidden shadow-lg">
              
              {/* Image */}
              <div className="relative aspect-[456/582] overflow-hidden">
                <img 
                  src={rooms[currentIndex].image} 
                  alt={rooms[currentIndex].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-white text-4xl sm:text-5xl font-light opacity-80">
                    {rooms[currentIndex].number}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h5 className="text-white text-lg sm:text-xl font-serif leading-tight">
                    {rooms[currentIndex].name}
                  </h5>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 sm:p-6 space-y-3 border-b border-gray-200">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="text-sm sm:text-base">{rooms[currentIndex].size}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm">{rooms[currentIndex].beds}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-sm">{rooms[currentIndex].feature}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
                <Link 
                  href={rooms[currentIndex].link}
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 sm:p-3 lg:p-4 shadow-lg transition-all"
            aria-label="Next"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots - Mobile Only */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <Social/>
      <StellaFooter/>
    </>
  );
};

export default Roomdetail;