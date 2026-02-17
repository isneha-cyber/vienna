import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminWrapper = ({ children, pageTitle = "Dashboard" }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
    const [notificationCounts] = useState({ booking: 3, comments: 3 });
    const [activeTab, setActiveTab] = useState('booking');

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpenMobile(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close sidebar on mobile when clicking outside
    useEffect(() => {
        if (isMobile && isSidebarOpenMobile) {
            const handleClickOutside = (e) => {
                const sidebar = document.querySelector('.mobile-sidebar');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (sidebar && menuBtn && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
                    setIsSidebarOpenMobile(false);
                }
            };
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isMobile, isSidebarOpenMobile]);

    // Handle tab click
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        if (isMobile) {
            setIsSidebarOpenMobile(false);
        }
    };

    return (
       <>
            {/* Navbar - Fixed at top */}
            <AdminNavbar 
                onMenuClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            />

            {/* Main Layout Container - Added padding-top to account for fixed navbar */}
            <div className="flex ">
                {/* Desktop Sidebar - Fixed but with proper spacing */}
                <div className="hidden md:block fixed left-0 top-16 bottom-0 w-20 lg:w-24 z-30">
                    <AdminSidebar 
                        activeTab={activeTab}
                        notificationCounts={notificationCounts}
                    />
                </div>

                {/* Mobile Sidebar Overlay */}
                {isMobile && isSidebarOpenMobile && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpenMobile(false)}
                    />
                )}

                {/* Mobile Sidebar */}
                <div className={`
                    mobile-sidebar fixed md:hidden top-16 left-0 bottom-0 z-50 w-64
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    
                        {/* Mobile sidebar content */}
                        <div className="pt-8 pb-4">
                            {[
                                { id: 'booking', label: 'Booking', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', hasNotification: true, count: notificationCounts.booking, href: '/booking' },
                                { id: 'rooms', label: 'Rooms', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', href: '/rooms' },
                                { id: 'comments', label: 'Comments', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', hasNotification: true, count: notificationCounts.comments, href: '/comments' },
                                { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', href: '/analytics' },
                                { id: 'config', label: 'Config', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', href: '/config' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className={`
                                        flex items-center gap-4 w-full px-6 py-4 text-left
                                        transition-colors duration-200
                                        ${activeTab === tab.id ? 'bg-[#3d4446]' : 'hover:bg-[#3d4446]'}
                                    `}
                                >
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#404749]">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                                            </svg>
                                        </div>
                                        {tab.hasNotification && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff8c42] rounded-full text-white text-xs flex items-center justify-center font-bold">
                                                {tab.count}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-white font-medium">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    
                </div>

                {/* Main Content Area - Fixed padding and width */}
               
                    <div className="">
                        {children}
                    </div>
               
            </div>
       </>
    );
};

export default AdminWrapper;