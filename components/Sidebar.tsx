
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS, LIB_ITEMS, SETTINGS_ITEMS } from '../constants';
import { User } from '../types';
import { Users } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentUser?: User | null;
  subscribedChannels: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentUser, subscribedChannels }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const MenuItem: React.FC<{ icon: React.ReactNode; label: string; id?: string }> = ({ icon, label, id }) => {
    const isActive = (id === 'home' && location.pathname === '/') || 
                     (id && location.pathname === `/${id}`);
    
    const handleClick = () => {
      if (id === 'home') navigate('/');
      else if (id) navigate(`/${id}`);
    };
    
    return (
      <button 
        onClick={handleClick}
        className={`w-full flex items-center space-x-5 px-3 py-3 rounded-xl transition-all duration-300 group ${
          isActive 
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
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
            onClick={() => navigate(item.id === 'home' ? '/' : `/${item.id}`)}
            className={`p-3 rounded-xl hover:bg-white/5 w-full flex justify-center transition-all ${
              (item.id === 'home' && location.pathname === '/') || (item.id && location.pathname === `/${item.id}`) ? 'text-cyan-400' : 'text-zinc-500'
            }`}
          >
            {item.icon}
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
        {currentUser && (
          <MenuItem 
            icon={<Users className="w-5 h-5" />} 
            label="Subscriptions" 
            id="subscriptions" 
          />
        )}
      </div>
      
      <div className="my-6 mx-4 border-t border-white/5" />
      
      <div className="px-4 space-y-1.5">
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Vault</h3>
        {LIB_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
        {currentUser && (
          <button onClick={() => navigate('/channel/me')} className="w-full flex items-center space-x-5 px-3 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group">
            <img src={currentUser.avatar} className="w-5 h-5 rounded-full border border-white/10" />
            <span className="text-xs font-black tracking-widest uppercase truncate">My Node</span>
          </button>
        )}
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />
      
      <div className="px-4 space-y-1.5">
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Channels</h3>
        {subscribedChannels.length > 0 ? (
          subscribedChannels.map((name) => (
            <button 
              key={name}
              onClick={() => navigate(`/channel/${name.toLowerCase().replace(' ', '')}`)}
              className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-white/5 group transition-all text-left"
            >
              <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${name}`} className="w-6 h-6 rounded-full border border-white/10" />
              <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider truncate">{name}</span>
            </button>
          ))
        ) : (
          <p className="px-4 py-2 text-[9px] text-zinc-700 uppercase tracking-widest">No active links</p>
        )}
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />

      <div className="px-4 space-y-1.5">
        {SETTINGS_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className="px-8 py-8 text-[9px] text-zinc-700 font-bold uppercase tracking-widest opacity-30">
        Build v9.0.0 // STABLE <br />
        © 2025 ASANIX DEV
      </div>
    </aside>
  );
};

export default Sidebar;
