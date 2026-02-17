// // Accomodation1.js
// import { Link } from 'lucide-react';
// import React, { useState } from 'react';
// import roomdata from '../../data/rooms.json';

// const Accomodation1 = () => {
//   const rooms = [
//     {
//       number: "01",
//       title: "Grand Overwater Bungalow with Jacuzzi",
//       area: "39m²",
//       guests: "Up to 3 guests",
//       bedInfo: "1 king-size bed and 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room1.jpg",
//         "images/room2.jpg",
//         "images/room3.jpg"
//       ],
//     },
//     {
//       number: "02",
//       title: "Swim-Up Maisonette",
//       area: "67m²",
//       guests: "Up to 4 guests",
//       bedInfo: "1 king size bed & 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room1.jpg",
//         "images/room2.jpg",
//         "images/room3.jpg"
//       ],
//     },
//     {
//       number: "03",
//       title: "Grand Overwater Bungalow with Jacuzzi",
//       area: "39m²",
//       guests: "Up to 3 guests",
//       bedInfo: "1 king-size bed and 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room1.jpg",
//         "images/room2.jpg",
//         "images/room3.jpg"
//       ],
//     },
//     {
//       number: "04",
//       title: "Swim-Up Maisonette",
//       area: "67m²",
//       guests: "Up to 4 guests",
//       bedInfo: "1 king size bed & 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room4.jpg",
//         "images/room4.jpg",
//         "images/room4.jpg"
//       ],
//     },
//     {
//       number: "05",
//       title: "Grand Overwater Bungalow with Jacuzzi",
//       area: "39m²",
//       guests: "Up to 3 guests",
//       bedInfo: "1 king-size bed and 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room5.jpg",
//         "images/room5.jpg",
//         "images/room5.jpg"
//       ],
//     },
//     {
//       number: "06",
//       title: "Swim-Up Maisonette",
//       area: "67m²",
//       guests: "Up to 4 guests",
//       bedInfo: "1 king size bed & 1 sofa bed",
//       deckInfo: "Wooden deck with direct access to lagoon pool",
//       images: [
//         "images/room6.jpg",
//         "images/room6.jpg",
//         "images/room6.jpg"
//       ],
//     },
//   ];

//   // Initialize current image index for each room (all start at 0)
//   const [currentImageIndex, setCurrentImageIndex] = useState(Array(rooms.length).fill(0));

//   const handlePrev = (roomIndex) => {
//     setCurrentImageIndex(prev => {
//       const newIndexes = [...prev];
//       const total = rooms[roomIndex].images.length;
//       newIndexes[roomIndex] = (newIndexes[roomIndex] - 1 + total) % total;
//       return newIndexes;
//     });
//   };

//   const handleNext = (roomIndex) => {
//     setCurrentImageIndex(prev => {
//       const newIndexes = [...prev];
//       const total = rooms[roomIndex].images.length;
//       newIndexes[roomIndex] = (newIndexes[roomIndex] + 1) % total;
//       return newIndexes;
//     });
//   };

//   return (
//     <>
//       {/* Header Section */}
//       <div className="px-8 md:px-16 lg:px-32 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
//         <h3 className="text-4xl md:text-5xl font-bold text-neutral-900">Stella Island Accommodation</h3>
//         <p className="text-lg md:text-xl text-neutral-700">
//           There are 12 elegant rooms and villas offering luxury services and a variety of restaurants aiming to indulge your senses.
//         </p>
//       </div>

//       {/* Filter Bar */}
//       <div className="px-8 md:px-16 lg:px-24 mb-12">
//         <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
//           <div className="border-t-2 border-gray-300 col-span-2"></div>
//           <div className="flex flex-wrap items-center justify-center gap-2 col-span-1">
//             <h3 className="font-medium whitespace-nowrap">Filter by:</h3>
//             <div className="relative">
//               <select
//                 className="appearance-none border border-gray-400 bg-white text-gray-700 py-2 px-4 pr-8 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
//               >
//                 <option value="" disabled selected hidden>PLEASE SELECT</option>
//                 <option value="overwater">Overwater Bungalows</option>
//                 <option value="swimup">Swim-Up Rooms</option>
//                 <option value="jacuzzi">With Jacuzzi</option>
//                 <option value="family">Family-Friendly</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Room Cards Section */}
//       <div className="px-8 md:px-16 lg:px-24 mb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {rooms.map((room, roomIndex) => {
//             const currentIndex = currentImageIndex[roomIndex];
//             const currentImage = room.images[currentIndex];

//             return (
//               <div key={roomIndex} className="bg-white overflow-hidden">
//                 {/* Image Container */}
//                 <div className="relative w-full h-64 lg:h-96 overflow-hidden">
//                   <img
//                     src={currentImage}
//                     alt={`${room.title} - View ${currentIndex + 1}`}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
//                     }}
//                   />
//                   {/* Room Number Overlay */}
//                   <div className="absolute top-4 left-4 text-white text-7xl md:text-8xl lg:text-9xl font-bold opacity-70 pointer-events-none">
//                     {room.number}
//                   </div>
//                   {/* Navigation Arrows */}
//                   <div className="absolute bottom-4 right-4 flex space-x-2">
//                     <button
//                       onClick={() => handlePrev(roomIndex)}
//                       className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition"
//                       aria-label="Previous image"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                       </svg>
//                     </button>
//                     <button
//                       onClick={() => handleNext(roomIndex)}
//                       className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition"
//                       aria-label="Next image"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Room Details */}
//                 <div className="p-5 md:p-6">
//                   <h4 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">{room.title}</h4>
//                   <div className="flex flex-wrap gap-y-2 mb-4 text-sm text-gray-600">
//                     <div className="flex items-center mr-6">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h-2M7 21h2m-2 0h-2m-2 0h-2" />
//                       </svg>
//                       {room.area}
//                     </div>
//                     <div className="flex items-center mr-6">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1c0-1.268.63-2.39 1.593-3.068a3.995 3.995 0 117.8 0c1.593.678 2.407 1.8 2.407 3.068zm5-1v-1c0-1.268.63-2.39 1.593-3.068a3.995 3.995 0 107.8 0c1.593.678 2.407 1.8 2.407 3.068z" />
//                       </svg>
//                       {room.guests}, {room.bedInfo}
//                     </div>
//                     <div className="flex items-center">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       {room.deckInfo}
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap gap-3">
//                     <button className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition">
//                       BOOK NOW
//                     </button>
//                     <Link to={''} className="border border-gray-300 text-gray-800 px-6 py-2 font-medium hover:bg-gray-50 transition">
//                       MORE INFO
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Accomodation1;


// Accomodation1.js

import React, { useState } from 'react';
import roomdata from '../../data/rooms.json';
import { Link } from '@inertiajs/react';

const Accomodation1 = () => {
  // Use the imported JSON data
  const rooms = roomdata;

  // Initialize current image index for each room (all start at 0)
  const [currentImageIndex, setCurrentImageIndex] = useState(Array(rooms.length).fill(0));

  const handlePrev = (roomIndex) => {
    setCurrentImageIndex(prev => {
      const newIndexes = [...prev];
      const total = rooms[roomIndex].images ? rooms[roomIndex].images.length : 1;
      newIndexes[roomIndex] = (newIndexes[roomIndex] - 1 + total) % total;
      return newIndexes;
    });
  };

  const handleNext = (roomIndex) => {
    setCurrentImageIndex(prev => {
      const newIndexes = [...prev];
      const total = rooms[roomIndex].images ? rooms[roomIndex].images.length : 1;
      newIndexes[roomIndex] = (newIndexes[roomIndex] + 1) % total;
      return newIndexes;
    });
  };

  // Function to get images for a room
  // If images array exists, use it, otherwise create default images
  const getRoomImages = (room) => {
    if (room.images && Array.isArray(room.images) && room.images.length > 0) {
      return room.images;
    }
    // Create default images based on room number or slug
    const roomNum = room.number;
    return [
      `/images/room${roomNum}.jpg`,
      `/images/room${roomNum}_2.jpg`,
      `/images/room${roomNum}_3.jpg`
    ];
  };

  return (
    <>
      {/* Header Section */}
      <div className="px-8 md:px-16 lg:px-32 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
        <h3 className="text-4xl md:text-5xl font-bold text-neutral-900">Stella Island Accommodation</h3>
        <p className="text-lg md:text-xl text-neutral-700">
          There are {rooms.length} elegant rooms and villas offering luxury services and a variety of restaurants aiming to indulge your senses.
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
                className="appearance-none border border-gray-400 bg-white text-gray-700 py-2 px-4 pr-8 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
              >
                <option value="" disabled selected hidden>PLEASE SELECT</option>
                <option value="overwater">Overwater Bungalows</option>
                <option value="swimup">Swim-Up Rooms</option>
                <option value="jacuzzi">With Jacuzzi</option>
                <option value="family">Family-Friendly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Room Cards Section */}
      <div className="px-8 md:px-16 lg:px-24 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {rooms.map((room, roomIndex) => {
            const roomImages = getRoomImages(room);
            const currentIndex = currentImageIndex[roomIndex];
            const currentImage = roomImages[currentIndex];

            return (
              <div key={roomIndex} className="bg-white overflow-hidden">
                {/* Image Container */}
                <div className="relative w-full h-64 lg:h-96 overflow-hidden">
                  <img
                    src='/images/room1.jpg'
                    alt={`${room.title} - View ${currentIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                    }}
                  />
                  {/* Room Number Overlay */}
                  <div className="absolute top-4 left-4 text-white text-7xl md:text-8xl lg:text-9xl font-bold opacity-70 pointer-events-none">
                    {room.number}
                  </div>
                  
                  {/* Only show navigation arrows if there are multiple images */}
                  {roomImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handlePrev(roomIndex)}
                        className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleNext(roomIndex)}
                        className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Room Details */}
                <div className="p-5 md:p-6">
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 text-gray-900">{room.title}</h4>
                  <div className="flex flex-wrap gap-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-2 0h-2M7 21h2m-2 0h-2m-2 0h-2" />
                      </svg>
                      {room.area}
                    </div>
                    <div className="flex items-center mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1c0-1.268.63-2.39 1.593-3.068a3.995 3.995 0 117.8 0c1.593.678 2.407 1.8 2.407 3.068zm5-1v-1c0-1.268.63-2.39 1.593-3.068a3.995 3.995 0 107.8 0c1.593.678 2.407 1.8 2.407 3.068z" />
                      </svg>
                      {room.guests}, {room.bedInfo}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {room.deckInfo}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-black text-white px-6 py-2 font-medium hover:bg-gray-800 transition">
                      BOOK NOW
                    </button>
                    <Link href={route('room.detail', { slug: room.slug })} className="border border-gray-300 text-gray-800 px-6 py-2 font-medium hover:bg-gray-50 transition">
                      MORE INFO
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Accomodation1;