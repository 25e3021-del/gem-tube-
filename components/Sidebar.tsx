
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS, LIB_ITEMS, SETTINGS_ITEMS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const MenuItem: React.FC<{ icon: React.ReactNode; label: string; id?: string }> = ({ icon, label, id }) => {
    const isActive = (id === 'home' && location.pathname === '/') || 
                     (id === 'reels' && location.pathname === '/reels') ||
                     (id === 'live' && location.pathname === '/live') ||
                     (id === 'history' && location.pathname === '/history') ||
                     (id === 'liked' && location.pathname === '/liked') ||
                     (id === 'library' && location.pathname === '/library') ||
                     (id === 'settings' && location.pathname === '/settings') ||
                     (id === 'privacy' && location.pathname === '/privacy') ||
                     (id === 'me' && location.pathname === '/channel/me');
    
    const handleClick = () => {
      if (id === 'home') navigate('/');
      else if (id === 'reels') navigate('/reels');
      else if (id === 'live') navigate('/live');
      else if (id === 'history') navigate('/history');
      else if (id === 'liked') navigate('/liked');
      else if (id === 'library') navigate('/library');
      else if (id === 'settings') navigate('/settings');
      else if (id === 'privacy') navigate('/privacy');
      else if (id === 'me') navigate('/channel/me');
    };
    
    return (
      <button 
        onClick={handleClick}
        className={`w-full flex items-center space-x-5 px-3 py-3 rounded-xl transition-all duration-300 group ${
          isActive 
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.05)]' 
            : 'hover:bg-white/5 text-zinc-400 hover:text-white border border-transparent'
        }`}
      >
        <span className={`${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`}>
          {icon}
        </span>
        <span className="text-xs font-black tracking-widest uppercase truncate">{label}</span>
      </button>
    );
  };

  if (!isOpen) {
    return (
      <aside className="w-20 flex flex-col items-center py-4 space-y-6 bg-[#050505] border-r border-white/5 hidden md:flex">
        {[...NAV_ITEMS, ...LIB_ITEMS].map((item) => (
          <button 
            key={item.id}
            onClick={() => {
              if (item.id === 'home') navigate('/');
              else if (item.id) navigate(`/${item.id}`);
            }}
            className={`flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/5 w-full group transition-all ${
              (item.id === 'home' && location.pathname === '/') || (item.id && location.pathname === `/${item.id}`)
              ? 'bg-white/5' : ''
            }`}
          >
            <span className={`${
              (item.id === 'home' && location.pathname === '/') || (item.id && location.pathname === `/${item.id}`)
              ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-cyan-400'
            } transition-colors`}>{item.icon}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-[#050505] border-r border-white/5 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar py-4 flex-shrink-0">
      <div className="px-4 space-y-1.5">
        {NAV_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className="my-6 mx-4 border-t border-white/5" />
      
      <div className="px-4 space-y-1.5">
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Library</h3>
        {LIB_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
        <MenuItem 
          icon={<img src="https://i.pravatar.cc/150?u=mychannel" className="w-5 h-5 rounded-full" />} 
          label="My Channel" 
          id="me" 
        />
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />
      
      <div className="px-4 space-y-1.5">
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Featured</h3>
        <button onClick={() => navigate('/channel/asanix')} className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all text-left">
          <img src="https://i.pravatar.cc/150?u=asanix" className="w-6 h-6 rounded-full border border-white/10" />
          <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">Asanix Labs</span>
        </button>
        <button onClick={() => navigate('/channel/lex')} className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all text-left">
          <img src="https://i.pravatar.cc/150?u=lex" className="w-6 h-6 rounded-full border border-white/10" />
          <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">Aether Interviews</span>
        </button>
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />

      <div className="px-4 space-y-1.5">
        {SETTINGS_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className="px-8 py-8 text-[9px] text-zinc-700 leading-relaxed font-bold uppercase tracking-widest opacity-40">
        Aethex Flows Protocol <br />
        Global Mesh Verified <br />
        Final Build v6.0.0 <br /><br />
        © 2025 ASANIX DEVELOPERS
      </div>
    </aside>
  );
};

export default Sidebar;
