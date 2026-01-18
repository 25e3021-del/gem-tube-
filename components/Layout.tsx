
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  subscribedChannels: string[];
  onOpenAuth: () => void;
  onSearch: (q: string) => void;
  onOpenUpload: (type: 'VIDEO' | 'REELS' | 'LIVE') => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentUser, subscribedChannels, onOpenAuth, onSearch, onOpenUpload, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050505] text-white">
      <Header 
        currentUser={currentUser}
        onOpenAuth={onOpenAuth}
        onSearch={onSearch} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onOpenUpload={onOpenUpload}
        onLogout={onLogout}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[55] animate-in fade-in duration-300" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Adaptive Sidebar */}
        <div className={`${isMobile ? 'fixed inset-y-0 left-0 z-[60] transform transition-transform duration-300' : 'relative'} ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
          <Sidebar isOpen={sidebarOpen || !isMobile} currentUser={currentUser} subscribedChannels={subscribedChannels} />
        </div>
        
        {/* Main Neural Terminal */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
