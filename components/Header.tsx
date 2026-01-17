
import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Plus, Bell, Cpu, Sparkles, Zap, Shield, Info, Video as VideoIcon, Radio, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onOpenAuth: () => void;
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
  onOpenUpload: (type: 'VIDEO' | 'REELS' | 'LIVE') => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onOpenAuth, onSearch, onToggleSidebar, onOpenUpload }) => {
  const [query, setQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (createRef.current && !createRef.current.contains(event.target as Node)) {
        setCreateMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { icon: <Zap className="w-4 h-4 text-cyan-400" />, text: "Asanix Labs uploaded a new video", time: "2m ago" },
    { icon: <Shield className="w-4 h-4 text-purple-400" />, text: "Security update successful", time: "15m ago" },
    { icon: <Info className="w-4 h-4 text-zinc-400" />, text: "New platform features added", time: "1h ago" },
  ];

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
          <span className="text-2xl font-black tracking-widest font-futuristic bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent italic text-nowrap">
            AETHEX FLOWS
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
              placeholder="Search neural index..."
              className="bg-transparent w-full outline-none text-white placeholder-white/20 text-sm tracking-wide font-medium"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="flex items-center space-x-4">
        {currentUser && (
          <div className="relative" ref={createRef}>
            <button 
              onClick={() => setCreateMenuOpen(!createMenuOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all group ${createMenuOpen ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-white/5 border-white/10 text-white hover:border-cyan-500/50'}`}
            >
              <Plus className={`w-5 h-5 ${createMenuOpen ? 'rotate-45' : ''} transition-transform`} />
              <span className="text-[10px] font-black tracking-[0.2em] hidden lg:block uppercase">Create</span>
            </button>

            {createMenuOpen && (
              <div className="absolute right-0 mt-4 w-56 glass border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <button 
                  onClick={() => { onOpenUpload('VIDEO'); setCreateMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <VideoIcon className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Upload Video</span>
                </button>
                <button 
                  onClick={() => { onOpenUpload('REELS'); setCreateMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <Zap className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Upload Reel</span>
                </button>
                <button 
                  onClick={() => { onOpenUpload('LIVE'); setCreateMenuOpen(false); }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                >
                  <Radio className="w-4 h-4 text-zinc-400 group-hover:text-red-500" />
                  <span className="text-[10px] font-black tracking-widest uppercase">Go Live</span>
                </button>
              </div>
            )}
          </div>
        )}

        <Link to="/generate" className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-cyan-500/30 transition-all group">
          <Sparkles className="w-5 h-5 text-cyan-400 group-hover:animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.2em] hidden lg:block uppercase">AI Tools</span>
        </Link>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2 transition-colors relative ${notificationsOpen ? 'text-cyan-400' : 'text-white/50 hover:text-white'}`}
          >
            <Bell className="w-6 h-6" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border-2 border-black"></div>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-4 w-80 glass border border-white/10 rounded-2xl shadow-2xl py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-6 pb-2 border-b border-white/5 mb-2 flex justify-between items-center">
                <span className="text-[10px] font-black tracking-widest uppercase text-cyan-400">Notifications</span>
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-6 py-3 hover:bg-white/5 flex items-start space-x-4 cursor-pointer transition-colors border-b border-white/5 last:border-0">
                  <div className="mt-1">{n.icon}</div>
                  <div>
                    <p className="text-xs text-white/90">{n.text}</p>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {currentUser ? (
          <Link to="/channel/me" className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 to-purple-500 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
              <img src={currentUser.avatar} alt="Node Profile" className="w-full h-full object-cover" />
            </div>
          </Link>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="flex items-center space-x-2 px-6 py-2.5 bg-white text-black rounded-full hover:bg-cyan-400 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-white/10"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
