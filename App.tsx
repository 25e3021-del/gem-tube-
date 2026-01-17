
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Generate from './pages/Generate';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0f0f0f] text-white">
      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onToggleSidebar={toggleSidebar} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/generate" element={<Generate />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
