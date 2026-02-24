// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';

// const AdminSidebar = ({ 
//     activeTab = 'gallery',
//     notificationCounts = { gallery: 3, comments: 3 }
// }) => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const tabs = [
//         { id: 'gallery', label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', hasNotification: true, count: notificationCounts.gallery, href: '/admingallery' },
//         { id: 'rooms', label: 'Rooms', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', href: '/adminrooms' },
//         { id: 'comments', label: 'Comments', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', hasNotification: true, count: notificationCounts.comments, href: '/admincomments' },
//         { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', href: '/adminanalytics' },
//         { id: 'config', label: 'Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', href: '/config' },
//     ];

//     return (
//         <>
//             {/* Desktop Sidebar */}
//             <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-24 bg-[#2d3436] flex-col items-center pt-20 pb-8 space-y-6 lg:space-y-8 z-40 shadow-lg">
//                 {tabs.map((tab) => (
//                     <Link
//                         key={tab.id}
//                         href={tab.href}
//                         className="flex flex-col items-center cursor-pointer group w-full px-2"
//                     >
//                         <div className="relative">
//                             <div className={`
//                                 w-11 h-11 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-2 transition-all duration-200
//                                 ${activeTab === tab.id ? 'bg-[#3d4446] shadow-md' : 'bg-transparent'}
//                                 ${activeTab === tab.id ? 'group-hover:bg-[#4d5456]' : 'group-hover:bg-[#3d4446] opacity-60 group-hover:opacity-100'}
//                             `}>
//                                 <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
//                                 </svg>
//                             </div>
//                             {tab.hasNotification && tab.count > 0 && (
//                                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff8c42] rounded-full text-white text-xs flex items-center justify-center font-bold shadow-md animate-pulse">
//                                     {tab.count}
//                                 </span>
//                             )}
//                         </div>
//                         <span className={`
//                             text-[10px] lg:text-xs uppercase tracking-wider text-center transition-colors duration-200
//                             ${activeTab === tab.id ? 'text-gray-200 font-semibold' : 'text-gray-400 group-hover:text-gray-300'}
//                         `}>
//                             {tab.label}
//                         </span>
//                     </Link>
//                 ))}
//             </aside>

//             {/* Mobile Bottom Navigation */}
//             <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2d3436] border-t border-gray-700 z-50 shadow-lg">
//                 <div className="flex items-center justify-around py-2 px-2">
//                     {tabs.slice(0, 5).map((tab) => (
//                         <Link
//                             key={tab.id}
//                             href={tab.href}
//                             className="flex flex-col items-center cursor-pointer group flex-1 py-1"
//                         >
//                             <div className="relative">
//                                 <div className={`
//                                     w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
//                                     ${activeTab === tab.id ? 'bg-[#3d4446]' : 'bg-transparent'}
//                                     ${activeTab === tab.id ? 'group-hover:bg-[#4d5456]' : 'group-hover:bg-[#3d4446] opacity-60 group-hover:opacity-100'}
//                                 `}>
//                                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
//                                     </svg>
//                                 </div>
//                                 {tab.hasNotification && tab.count > 0 && (
//                                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff8c42] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
//                                         {tab.count}
//                                     </span>
//                                 )}
//                             </div>
//                             <span className={`
//                                 text-[9px] uppercase tracking-wider mt-1 transition-colors duration-200
//                                 ${activeTab === tab.id ? 'text-gray-200 font-semibold' : 'text-gray-400'}
//                             `}>
//                                 {tab.label}
//                             </span>
//                         </Link>
//                     ))}
//                 </div>
//             </nav>

//             {/* Spacer for desktop sidebar */}
//             <div className="hidden md:block w-20 lg:w-24 flex-shrink-0" />
//         </>
//     );
// };

// export default AdminSidebar;


import React from 'react';
import { Link } from '@inertiajs/react';

const tabs = [
  { id: 'gallery',   label: 'Gallery',   href: '/admingallery',   icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', badge: 3 },
  { id: 'rooms',     label: 'Rooms',     href: '/adminrooms',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'logs',  label: 'Logs',  href: '/adminlogs',    icon: 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm1 2h6v1H7V6zm0 3h6v1H7V9zm0 3h6v1H7v-1z', badge: 5 },
  { id: 'analytics', label: 'Analytics', href: '/adminanalytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'users',    label: 'users',    href: '/adminusers',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

const AdminSidebar = ({ activeTab = 'gallery' }) => {
  return (
    <>
      {/* ── Desktop Sidebar ── */}
      {/* Fixed, starts below navbar (top-16), full height underneath */}
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-20 lg:w-24 bg-[#2d3436] flex-col items-center pt-6 pb-8 gap-2 z-40">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`
                relative flex flex-col items-center gap-1.5 w-full px-2 py-3 group transition-all duration-200
                ${isActive ? 'bg-[#3d4446]' : 'hover:bg-[#3a3f41]'}
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#ff8c42] rounded-r-full" />
              )}

              {/* Icon wrapper */}
              <div className="relative">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                  ${isActive ? 'bg-[#ff8c42]/20' : 'group-hover:bg-white/5'}
                `}>
                  <svg
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-[#ff8c42]' : 'text-gray-400 group-hover:text-gray-200'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                </div>
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff8c42] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] uppercase tracking-wider transition-colors ${isActive ? 'text-[#ff8c42] font-semibold' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* ── Mobile Bottom Navigation ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#2d3436] border-t border-gray-700 z-50">
        <div className="flex items-stretch justify-around">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 relative transition-colors
                  ${isActive ? 'bg-[#3d4446]' : 'hover:bg-[#3a3f41]'}`}
              >
                {/* Active top bar */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ff8c42] rounded-full" />
                )}
                <div className="relative">
                  <svg
                    className={`w-5 h-5 transition-colors ${isActive ? 'text-[#ff8c42]' : 'text-gray-400'}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#ff8c42] rounded-full text-white text-[8px] flex items-center justify-center font-bold">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[9px] uppercase tracking-wider ${isActive ? 'text-[#ff8c42] font-semibold' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;