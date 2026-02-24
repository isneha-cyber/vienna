// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from '@inertiajs/react';

// const AdminNavbar = ({ onMenuClick }) => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const profileRef = useRef(null);
//   const searchRef = useRef(null);

//   const userMenuItems = [
//     { 
//       label: 'Profile', 
//       icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
//       href: '/profile'
//     },
//     { 
//       label: 'Settings', 
//       icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
//       href: '/settings'
//     },
//     { 
//       label: 'Logout', 
//       icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
//       href: '/logout',
//       danger: true
//     },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     };

//     if (isProfileOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isProfileOpen]);

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       // Cmd+K or Ctrl+K for search
//       if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
//         e.preventDefault();
//         searchRef.current?.focus();
//       }
//       // Escape to close search/dropdown
//       if (e.key === 'Escape') {
//         setIsProfileOpen(false);
//         searchRef.current?.blur();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   return (
//     <>
//       {/* Main Navbar */}
//       <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14 sm:h-16">
            
//             {/* Left Section: Mobile Menu + Logo */}
//             <div className="flex items-center gap-2 sm:gap-3">
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={onMenuClick}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 aria-label="Toggle menu"
//               >
//                 <svg 
//                   className="w-6 h-6 text-gray-700" 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M4 6h16M4 12h16M4 18h16" 
//                   />
//                 </svg>
//               </button>

//               {/* Logo */}
//               <Link 
//                 href="/dashboard" 
//                 className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group"
//               >
//                 <h2 className=" text-xl sm:text-4xl font-light ">Stella Island</h2>
//               </Link>
//             </div>

//             {/* Right Section: Search Bar & Profile */}
//             <div className="flex items-center gap-2 sm:gap-4">
              
//               {/* Search Bar */}
//               <div className="relative" ref={searchRef}>
//                 <div className={`
//                   flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1
//                   transition-all duration-200 border
//                   ${isSearchFocused ? 'border-indigo-300 bg-white shadow-md ring-2 ring-indigo-100' : 'border-transparent hover:bg-gray-100'}
//                 `}>
//                   <svg 
//                     className="w-4 h-4 text-gray-400 flex-shrink-0" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
//                     />
//                   </svg>
//                   <input
//                     ref={searchRef}
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setIsSearchFocused(true)}
//                     onBlur={() => setIsSearchFocused(false)}
//                     className="
//                       bg-transparent border-none outline-none text-sm text-gray-700
//                       placeholder-gray-400 w-24 sm:w-40 md:w-56 lg:w-64
//                       focus:placeholder-gray-300
//                     "
//                     aria-label="Search"
//                   />
//                   {/* Clear button when search has value */}
//                   {searchQuery && (
//                     <button
//                       onClick={() => setSearchQuery('')}
//                       className="p-0.5 hover:bg-gray-200 rounded transition-colors"
//                       aria-label="Clear search"
//                     >
//                       <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                       </svg>
//                     </button>
//                   )}
//                   {/* <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded shadow-sm">
//                     ⌘K
//                   </kbd> */}
//                 </div>
//               </div>

//               {/* Notifications Icon - Optional */}
//               <button
//                 className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors relative focus:outline-none focus:ring-2 focus:ring-gray-300"
//                 aria-label="Notifications"
//               >
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
//                 </svg>
//                 {/* Notification Badge */}
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
//               </button>

//               {/* Profile Dropdown */}
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="
//                     flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 rounded-lg
//                     hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200
//                     focus:outline-none focus:ring-2 focus:ring-gray-300
//                   "
//                   aria-label="User menu"
//                   aria-expanded={isProfileOpen}
//                 >
//                   {/* Avatar */}
//                   <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md ring-2 ring-white">
//                     KJ
//                   </div>
                  
//                   {/* User Info - Hidden on small screens */}
//                   <div className="hidden lg:block text-left max-w-[150px]">
//                     <p className="text-sm font-semibold text-gray-900 truncate">Isneha</p>
//                     <p className="text-xs text-gray-500 truncate">Administrator</p>
//                   </div>

//                   {/* Dropdown Icon */}
//                   <svg 
//                     className={`
//                       hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-200 
//                       ${isProfileOpen ? 'rotate-180' : ''}
//                     `}
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isProfileOpen && (
//                   <div 
//                     className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
//                     role="menu"
//                   >
//                     {/* User Info in Dropdown */}
//                     <div className="px-4 py-3 border-b border-gray-100">
//                       <p className="text-sm font-semibold text-gray-900">Katy Jones</p>
//                       <p className="text-xs text-gray-500 mt-0.5 truncate">katy@stayease.com</p>
//                       <span className="inline-flex items-center px-2 py-0.5 mt-2 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
//                         Administrator
//                       </span>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-1">
//                       {userMenuItems.map((item, index) => (
//                         <Link
//                           key={index}
//                           href={item.href}
//                           onClick={() => setIsProfileOpen(false)}
//                           className={`
//                             flex items-center gap-3 px-4 py-2.5 text-sm
//                             transition-colors duration-150
//                             ${item.danger 
//                               ? 'text-red-700 hover:bg-red-50' 
//                               : 'text-gray-700 hover:bg-gray-50'
//                             }
//                           `}
//                           role="menuitem"
//                         >
//                           <svg 
//                             className={`w-5 h-5 ${item.danger ? 'text-red-500' : 'text-gray-400'}`}
//                             fill="none" 
//                             stroke="currentColor" 
//                             viewBox="0 0 24 24"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
//                           </svg>
//                           <span className="font-medium">{item.label}</span>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

      
//     </>
//   );
// };

// export default AdminNavbar;


import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

const AdminNavbar = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const profileRef = useRef(null);

  const userMenuItems = [
    { label: 'Profile',  icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', href: '/profile' },
    { label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', href: '/settings' },
    { label: 'Logout',   icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1', href: '/logout', danger: true },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4 sm:px-6 justify-between shadow-sm">

      {/* ── Left: Hamburger + Logo ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/" className="text-xl sm:text-5xl font-light tracking-wide text-gray-900">
        <h2>Stella Island</h2>
          
        </Link>
      </div>

      {/* ── Right: Search + Notif + Profile ── */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* Search */}
        <div className="relative hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2 focus-within:ring-2 focus-within:ring-gray-200 focus-within:bg-white transition-all border border-transparent focus-within:border-gray-200">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-32 md:w-48"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors hidden sm:flex">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow ring-2 ring-white">
              KJ
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-gray-900 leading-none">Isneha</p>
              <p className="text-xs text-gray-400 mt-0.5">Administrator</p>
            </div>
            <svg className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Katy Jones</p>
                <p className="text-xs text-gray-400 mt-0.5">katy@stellaisland.com</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
                  Administrator
                </span>
              </div>
              <div className="py-1">
                {userMenuItems.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setIsProfileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                      ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <svg className={`w-4 h-4 ${item.danger ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default AdminNavbar;