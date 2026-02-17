// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import { useState } from 'react';

// export default function Maindashboard() {
//     const [selectedDate, setSelectedDate] = useState(17);

//     return (
//         <AuthenticatedLayout
//             header={
//                 <h3 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h3>
//             }
//         >
//             <Head title="Dashboard" />

//             {/* Main Dashboard Container */}
//             <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
//                 <div className="flex h-screen">
//                     {/* Left Sidebar Navigation */}
//                     <aside className="w-24 bg-[#2d3436] flex flex-col items-center py-8 space-y-8">
//                         {/* Booking Icon - Active State */}
//                         <div className="flex flex-col items-center cursor-pointer group">
//                             <div className="relative">
//                                 <div className="w-12 h-12 bg-[#3d4446] rounded-lg flex items-center justify-center mb-2 group-hover:bg-[#4d5456] transition-colors">
//                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                     </svg>
//                                 </div>
//                                 {/* Orange notification badge */}
//                                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff8c42] rounded-full text-white text-xs flex items-center justify-center font-bold">
//                                     3
//                                 </span>
//                             </div>
//                             <span className="text-xs text-gray-400 uppercase tracking-wider">Booking</span>
//                         </div>

//                         {/* Rooms Icon */}
//                         <div className="flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
//                             <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center mb-2">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                             </div>
//                             <span className="text-xs text-gray-400 uppercase tracking-wider">Rooms</span>
//                         </div>

//                         {/* Comments Icon */}
//                         <div className="flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
//                             <div className="relative">
//                                 <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center mb-2">
//                                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                                     </svg>
//                                 </div>
//                                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff8c42] rounded-full text-white text-xs flex items-center justify-center font-bold">
//                                     3
//                                 </span>
//                             </div>
//                             <span className="text-xs text-gray-400 uppercase tracking-wider">Comments</span>
//                         </div>

//                         {/* Analytics Icon */}
//                         <div className="flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
//                             <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center mb-2">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                                 </svg>
//                             </div>
//                             <span className="text-xs text-gray-400 uppercase tracking-wider">Analytics</span>
//                         </div>

//                         {/* Configuration Icon - Bottom */}
//                         <div className="mt-auto flex flex-col items-center cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
//                             <div className="w-12 h-12 bg-transparent rounded-lg flex items-center justify-center mb-2">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             </div>
//                             <span className="text-xs text-gray-400 uppercase tracking-wider">Config</span>
//                         </div>
//                     </aside>

//                     {/* Main Content Area */}
//                     <main className="flex-1 overflow-y-auto p-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl">
                            
//                             {/* Left Column - Main Widgets */}
//                             <div className="lg:col-span-2 space-y-6">
                                
//                                 {/* Mail Widget */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     <div className="bg-gradient-to-r from-[#2d3436] to-[#3d4446] px-6 py-4 flex items-center justify-between">
//                                         <h2 className="text-white font-semibold text-lg">Mail</h2>
//                                         <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors">
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="p-6 grid grid-cols-2 gap-8">
//                                         <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-gray-50 rounded-lg p-4 transition-colors">
//                                             <div className="w-16 h-16 bg-[#2d3436] rounded-lg flex items-center justify-center">
//                                                 <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                                                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                                                 </svg>
//                                             </div>
//                                             <div className="text-center">
//                                                 <div className="text-2xl font-bold text-gray-800">Inbox</div>
//                                                 <div className="flex items-center justify-center mt-1">
//                                                     <span className="text-xs bg-[#ff8c42] text-white rounded-full px-2 py-0.5 font-semibold">3</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-gray-50 rounded-lg p-4 transition-colors">
//                                             <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
//                                                 <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                                 </svg>
//                                             </div>
//                                             <div className="text-2xl font-bold text-gray-800">New</div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Popular Rooms Widget */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     <div className="bg-gradient-to-r from-[#2d3436] to-[#3d4446] px-6 py-4 flex items-center justify-between">
//                                         <h2 className="text-white font-semibold text-lg">Popular rooms</h2>
//                                         <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors">
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="p-6">
//                                         <table className="w-full">
//                                             <thead className="border-b border-gray-200">
//                                                 <tr className="text-left text-sm text-gray-500">
//                                                     <th className="pb-3 font-medium">Name <span className="text-gray-400">▼</span></th>
//                                                     <th className="pb-3 font-medium"># booked</th>
//                                                     <th className="pb-3 font-medium"># available</th>
//                                                     <th className="pb-3 font-medium">Price</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="divide-y divide-gray-100">
//                                                 <tr className="hover:bg-gray-50 transition-colors">
//                                                     <td className="py-4 text-gray-800 font-medium">1 person travel room (12)</td>
//                                                     <td className="py-4 text-gray-600">178</td>
//                                                     <td className="py-4 text-gray-600">8</td>
//                                                     <td className="py-4 font-semibold text-gray-800">$329 <span className="text-gray-400 text-sm">/night</span></td>
//                                                 </tr>
//                                                 <tr className="hover:bg-gray-50 transition-colors">
//                                                     <td className="py-4 text-gray-800 font-medium">Family Suite (4)</td>
//                                                     <td className="py-4 text-gray-600">122</td>
//                                                     <td className="py-4 text-gray-600">4</td>
//                                                     <td className="py-4 font-semibold text-gray-800">$149 <span className="text-gray-400 text-sm">/night</span></td>
//                                                 </tr>
//                                                 <tr className="hover:bg-gray-50 transition-colors">
//                                                     <td className="py-4 text-gray-800 font-medium">Midnight Suite (2)</td>
//                                                     <td className="py-4 text-gray-600">75</td>
//                                                     <td className="py-4 text-gray-600">0</td>
//                                                     <td className="py-4 font-semibold text-gray-800">$254 <span className="text-gray-400 text-sm">/night</span></td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>

//                                 {/* Booking Statistics */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     <div className="bg-gradient-to-r from-[#2d3436] to-[#3d4446] px-6 py-4 flex items-center justify-between">
//                                         <h2 className="text-white font-semibold text-lg">Booking</h2>
//                                         <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors">
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="p-8 grid grid-cols-3 gap-8">
//                                         <div className="text-center">
//                                             <div className="text-6xl font-bold text-gray-800 mb-2">23</div>
//                                             <div className="text-gray-600 text-sm mb-4">Current bookings</div>
//                                             <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors font-medium text-sm">
//                                                 View
//                                             </button>
//                                         </div>
//                                         <div className="text-center">
//                                             <div className="text-6xl font-bold text-gray-800 mb-2">8</div>
//                                             <div className="text-gray-600 text-sm mb-4">Pending bookings</div>
//                                             <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors font-medium text-sm">
//                                                 View
//                                             </button>
//                                         </div>
//                                         <div className="text-center">
//                                             <div className="text-6xl font-bold text-gray-800 mb-2">1</div>
//                                             <div className="text-gray-600 text-sm mb-4">Expired bookings</div>
//                                             <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors font-medium text-sm">
//                                                 View
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Latest Comments */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     <div className="bg-gradient-to-r from-[#2d3436] to-[#3d4446] px-6 py-4 flex items-center justify-between">
//                                         <h2 className="text-white font-semibold text-lg">Latest Comments</h2>
//                                         <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors">
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="p-6 space-y-4">
//                                         {[
//                                             { name: 'Katy Jones', comment: "It's appealing not just nice!", avatar: '👩' },
//                                             { name: 'Jane Doe', comment: "Look! In the sky. It's a bird, it's a plane. Or is it a hellicopter?...", avatar: '👨' },
//                                             { name: 'Chris Colen', comment: "It's engaging not just magical!", avatar: '👨' }
//                                         ].map((item, index) => (
//                                             <div key={index} className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-lg transition-colors">
//                                                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
//                                                     {item.avatar}
//                                                 </div>
//                                                 <div className="flex-1">
//                                                     <p className="text-gray-700 text-sm leading-relaxed mb-1">{item.comment}</p>
//                                                     <p className="text-gray-500 text-xs font-medium">{item.name}</p>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Analytic Summary */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     <div className="bg-gradient-to-r from-[#2d3436] to-[#3d4446] px-6 py-4 flex items-center justify-between">
//                                         <h2 className="text-white font-semibold text-lg">Analytic summary</h2>
//                                         <button className="text-[#ffd93d] hover:text-[#ffed4e] transition-colors">
//                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="p-8 grid grid-cols-2 gap-8">
//                                         {/* Donut Chart */}
//                                         <div className="flex flex-col items-center justify-center">
//                                             <div className="relative w-48 h-48">
//                                                 {/* SVG Donut Chart - 74% filled */}
//                                                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
//                                                     {/* Background circle */}
//                                                     <circle
//                                                         cx="50"
//                                                         cy="50"
//                                                         r="40"
//                                                         fill="none"
//                                                         stroke="#e5e7eb"
//                                                         strokeWidth="12"
//                                                     />
//                                                     {/* Progress circle - 74% */}
//                                                     <circle
//                                                         cx="50"
//                                                         cy="50"
//                                                         r="40"
//                                                         fill="none"
//                                                         stroke="#2d3436"
//                                                         strokeWidth="12"
//                                                         strokeDasharray={`${2 * Math.PI * 40 * 0.74} ${2 * Math.PI * 40}`}
//                                                         strokeLinecap="round"
//                                                         className="transition-all duration-1000"
//                                                     />
//                                                 </svg>
//                                                 {/* Center text */}
//                                                 <div className="absolute inset-0 flex items-center justify-center">
//                                                     <div className="text-center">
//                                                         <div className="text-4xl font-bold text-gray-800">74%</div>
//                                                         <div className="text-sm text-gray-400 mt-1">26%</div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="mt-6 space-y-2">
//                                                 <div className="flex items-center space-x-2">
//                                                     <div className="w-4 h-4 rounded-full bg-[#2d3436]"></div>
//                                                     <span className="text-sm text-gray-600">Desktop</span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <div className="w-4 h-4 rounded-full bg-gray-300"></div>
//                                                     <span className="text-sm text-gray-600">Mobile</span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Area Chart */}
//                                         <div className="flex flex-col">
//                                             <div className="flex justify-between text-xs text-gray-400 mb-4">
//                                                 <span>January</span>
//                                                 <span>February</span>
//                                                 <span>March</span>
//                                                 <span>April</span>
//                                                 <span>May</span>
//                                             </div>
//                                             <div className="relative h-48">
//                                                 <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
//                                                     {/* Grid lines */}
//                                                     <line x1="0" y1="0" x2="400" y2="0" stroke="#e5e7eb" strokeWidth="1" />
//                                                     <line x1="0" y1="50" x2="400" y2="50" stroke="#e5e7eb" strokeWidth="1" />
//                                                     <line x1="0" y1="100" x2="400" y2="100" stroke="#e5e7eb" strokeWidth="1" />
//                                                     <line x1="0" y1="150" x2="400" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                                                    
//                                                     {/* Area gradient */}
//                                                     <defs>
//                                                         <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                                                             <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
//                                                             <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.1" />
//                                                         </linearGradient>
//                                                     </defs>
                                                    
//                                                     {/* Area path */}
//                                                     <path
//                                                         d="M 0,120 Q 50,80 100,60 T 200,50 T 300,90 T 400,70 L 400,150 L 0,150 Z"
//                                                         fill="url(#areaGradient)"
//                                                     />
                                                    
//                                                     {/* Line path */}
//                                                     <path
//                                                         d="M 0,120 Q 50,80 100,60 T 200,50 T 300,90 T 400,70"
//                                                         fill="none"
//                                                         stroke="#0ea5e9"
//                                                         strokeWidth="3"
//                                                     />
                                                    
//                                                     {/* Data point marker at March (peak) */}
//                                                     <circle cx="200" cy="50" r="5" fill="#2d3436" />
                                                    
//                                                     {/* Tooltip background */}
//                                                     <rect x="175" y="30" width="50" height="20" fill="#2d3436" rx="3" />
//                                                     <text x="200" y="44" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
//                                                         Feb 9
//                                                     </text>
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Right Sidebar - Profile & Calendar */}
//                             <div className="space-y-6">
//                                 {/* User Profile Card with Background Image */}
//                                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                                     {/* Background Image Section */}
//                                     <div className="relative h-64 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
//                                         {/* Simulated hotel background with overlay */}
//                                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
                                        
//                                         {/* Profile Info Overlay */}
//                                         <div className="absolute top-4 right-4">
//                                             <button className="text-white hover:text-gray-200 transition-colors text-sm flex items-center space-x-1">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                                 </svg>
//                                                 <span>Edit</span>
//                                             </button>
//                                         </div>

//                                         {/* Weather Info */}
//                                         <div className="absolute top-4 left-4 text-white">
//                                             <div className="flex items-center space-x-2 text-sm">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                                                 </svg>
//                                                 <span>24°C</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2 text-sm mt-1">
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 <span>1:54 pm</span>
//                                             </div>
//                                         </div>

//                                         {/* Date Circle */}
//                                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                                             <div className="w-32 h-32 rounded-full border-4 border-white/80 bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center text-white">
//                                                 <div className="text-5xl font-bold">{selectedDate}</div>
//                                                 <div className="text-sm mt-1">May 2015</div>
//                                             </div>
//                                         </div>

//                                         {/* Search Bar at Bottom */}
//                                         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-4/5">
//                                             <div className="relative">
//                                                 <input
//                                                     type="text"
//                                                     placeholder="septeni"
//                                                     className="w-full px-4 py-2 pr-10 rounded-full bg-white/90 backdrop-blur-sm border border-white focus:outline-none focus:ring-2 focus:ring-white text-gray-700 placeholder-gray-500"
//                                                 />
//                                                 <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
//                                                     <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         {/* Log Off Button */}
//                                         <div className="absolute bottom-6 right-6">
//                                             <button className="flex flex-col items-center text-white hover:text-gray-200 transition-colors">
//                                                 <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 <span className="text-xs">Log off</span>
//                                             </button>
//                                         </div>
//                                     </div>

//                                     {/* Profile Details */}
//                                     <div className="p-6">
//                                         <div className="flex items-center space-x-4 mb-4">
//                                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
//                                                 <span className="text-white font-semibold text-lg">KJ</span>
//                                             </div>
//                                             <div>
//                                                 <h3 className="font-semibold text-gray-800">KATY JONES</h3>
//                                                 <p className="text-sm text-gray-500">Administrator</p>
//                                             </div>
//                                         </div>

//                                         {/* Mini Calendar */}
//                                         <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 mt-6">
//                                             <div className="text-center mb-3">
//                                                 <div className="flex items-center justify-between mb-2">
//                                                     <button className="text-gray-400 hover:text-gray-600">
//                                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                                                         </svg>
//                                                     </button>
//                                                     <h4 className="font-semibold text-gray-700">May 2015</h4>
//                                                     <button className="text-gray-400 hover:text-gray-600">
//                                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                         </svg>
//                                                     </button>
//                                                 </div>
//                                             </div>
                                            
//                                             <div className="grid grid-cols-7 gap-2 text-center text-xs">
//                                                 {/* Day headers */}
//                                                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
//                                                     <div key={i} className="text-gray-500 font-medium py-1">{day}</div>
//                                                 ))}
                                                
//                                                 {/* Calendar days */}
//                                                 {[...Array(35)].map((_, i) => {
//                                                     const day = i - 4; // Offset to start on correct day
//                                                     const isCurrentMonth = day > 0 && day <= 31;
//                                                     const isSelected = day === selectedDate;
                                                    
//                                                     return (
//                                                         <button
//                                                             key={i}
//                                                             onClick={() => isCurrentMonth && setSelectedDate(day)}
//                                                             className={`
//                                                                 py-1.5 rounded-full text-xs font-medium transition-all
//                                                                 ${isSelected ? 'bg-blue-500 text-white shadow-lg scale-110' : ''}
//                                                                 ${isCurrentMonth && !isSelected ? 'text-gray-700 hover:bg-blue-100' : ''}
//                                                                 ${!isCurrentMonth ? 'text-gray-300' : ''}
//                                                             `}
//                                                         >
//                                                             {isCurrentMonth ? day : ''}
//                                                         </button>
//                                                     );
//                                                 })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }


import AdminWrapper from '@/Components/AdminWrapper/AdminWapper'
import React from 'react'

const Maindashboard = () => {
  return (
  <>
  <AdminWrapper/>
  </>
  )
}

export default Maindashboard
