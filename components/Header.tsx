
import React, { useState } from 'react';
import { Menu, Search, Video, Bell, User, Mic } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onToggleSidebar }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] flex items-center justify-between px-4 py-2 h-14">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center space-x-1 cursor-pointer">
          <div className="bg-red-600 rounded-lg p-1">
            <Video className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tighter">GemTube</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-4 flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex flex-1 items-center">
          <div className="flex flex-1 items-center bg-zinc-900 border border-zinc-700 rounded-l-full px-4 py-1.5 focus-within:border-blue-500">
            <Search className="w-5 h-5 text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="AI-powered search..."
              className="bg-transparent w-full outline-none text-white placeholder-zinc-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="bg-zinc-800 border border-l-0 border-zinc-700 px-5 py-1.5 rounded-r-full hover:bg-zinc-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
        <button className="p-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors hidden sm:block">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Link to="/generate" className="p-2 hover:bg-zinc-800 rounded-full transition-colors hidden md:block">
          <Video className="w-6 h-6" />
        </Link>
        <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors hidden md:block">
          <Bell className="w-6 h-6" />
        </button>
        <button className="p-1 hover:bg-zinc-800 rounded-full transition-colors">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
