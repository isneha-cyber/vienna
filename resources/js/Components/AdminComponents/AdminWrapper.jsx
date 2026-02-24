import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminWrapper = ({ children, activeTab = 'gallery' }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Fixed Navbar (h-16) ── */}
      <AdminNavbar onMenuClick={() => setMobileSidebarOpen(prev => !prev)} />

      {/* ── Fixed Desktop Sidebar ── */}
      {/* AdminSidebar renders its own fixed aside for desktop, fixed bottom nav for mobile */}
      <AdminSidebar activeTab={activeTab} />

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Mobile Slide-in Sidebar ── */}
      <div className={`
        md:hidden fixed top-16 left-0 bottom-0 w-64 bg-[#2d3436] z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="flex flex-col pt-4 pb-6">
          {[
            { id: 'gallery',   label: 'Gallery',   href: '/admingallery',   icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', badge: 3 },
            { id: 'rooms',     label: 'Rooms',     href: '/adminrooms',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'logs',  label: 'Logs',  href: '/adminlogs',    icon: 'M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm1 2h6v1H7V6zm0 3h6v1H7V9zm0 3h6v1H7v-1z', badge: 5 },
            { id: 'analytics', label: 'Analytics', href: '/adminanalytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
            { id: 'Users',    label: 'Users',    href: '/adminusers',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 transition-colors
                  ${isActive ? 'bg-[#3d4446]' : 'hover:bg-[#3a3f41]'}`}
              >
                <div className="relative">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#ff8c42]/20' : 'bg-[#3d4446]'}`}>
                    <svg className={`w-5 h-5 ${isActive ? 'text-[#ff8c42]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                  </div>
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff8c42] rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────
          pt-16  → clears the fixed navbar (h-16)
          md:pl-20 lg:pl-24 → clears the fixed desktop sidebar (w-20 / w-24)
          pb-16  → clears the mobile bottom nav on small screens
      ── */}
      <main className="pt-16 md:pl-20 lg:pl-24 pb-16 md:pb-0 min-h-screen">
        {children}
      </main>

    </div>
  );
};

export default AdminWrapper;