
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
                     (id && location.pathname.includes(id));
    
    const handleClick = () => {
      if (id === 'home') navigate('/');
      else if (id === 'generate') navigate('/generate');
      else {
        // Futuristic toast simulation or simple alert
        console.log(`Neural link to ${label} is currently restricted to Alpha tier users.`);
      }
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
        <span className={`${isActive ? 'text-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'group-hover:text-cyan-400 transition-colors'}`}>
          {icon}
        </span>
        <span className="text-xs font-black tracking-widest uppercase truncate">{label}</span>
      </button>
    );
  };

  if (!isOpen) {
    return (
      <aside className="w-20 flex flex-col items-center py-4 space-y-6 bg-[#050505] border-r border-white/5 hidden md:flex">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id}
            onClick={() => item.id === 'home' ? navigate('/') : null}
            className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/5 w-full group transition-all"
          >
            <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">{item.icon}</span>
            <span className="text-[8px] font-black uppercase tracking-widest mt-2 group-hover:text-white opacity-50">{item.label}</span>
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
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">User Core</h3>
        {LIB_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />
      
      <div className="px-4 space-y-1.5">
        <h3 className="px-4 py-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Sub-Networks</h3>
        <div className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-all">
          <div className="p-[1px] rounded-full bg-cyan-500/20 group-hover:bg-cyan-500">
            <img src="https://i.pravatar.cc/150?u=fire" className="w-6 h-6 rounded-full border border-black" />
          </div>
          <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">Neural_Exploits</span>
        </div>
        <div className="flex items-center space-x-4 px-4 py-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-all">
          <div className="p-[1px] rounded-full bg-purple-500/20 group-hover:bg-purple-500">
            <img src="https://i.pravatar.cc/150?u=lex" className="w-6 h-6 rounded-full border border-black" />
          </div>
          <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">Aether_Interviews</span>
        </div>
      </div>

      <div className="my-6 mx-4 border-t border-white/5" />

      <div className="px-4 space-y-1.5">
        {SETTINGS_ITEMS.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </div>
      
      <div className="px-8 py-8 text-[9px] text-zinc-700 leading-relaxed font-bold uppercase tracking-widest opacity-40">
        AetherFlow Protocol v4.0.2 <br />
        Global Mesh Verified <br />
        Quantum Encrypted <br /><br />
        © 2050 NEURAL-CORP
      </div>
    </aside>
  );
};

export default Sidebar;
