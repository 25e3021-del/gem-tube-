
import React, { useState } from 'react';
import { Menu, Search, Video, Bell, User, Cpu, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 py-2 h-16">
      <div className="flex items-center space-x-6">
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-white/10 rounded-full transition-all text-cyan-400"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg p-1.5 shadow-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-widest font-futuristic bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent italic">
            AETHERFLOW
          </span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl px-8 flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex flex-1 items-center relative group">
          <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl group-focus-within:bg-cyan-500/20 transition-all"></div>
          <div className="flex flex-1 items-center bg-white/5 border border-white/10 rounded-full px-6 py-2 focus-within:border-cyan-500/50 relative z-10 transition-all">
            <Search className="w-5 h-5 text-cyan-400/50 mr-3" />
            <input
              type="text"
              placeholder="Mine the neural net..."
              className="bg-transparent w-full outline-none text-white placeholder-white/20 text-sm tracking-wide"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/generate" className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-cyan-500/30 transition-all group">
          <Sparkles className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
          <span className="text-xs font-bold tracking-widest hidden lg:block">REALITY ENGINE</span>
        </Link>
        <button className="p-2 text-white/50 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
        </button>
        <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-cyan-500 to-purple-500">
          <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
