
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS, LIB_ITEMS, SETTINGS_ITEMS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Fix: Using React.FC to define the component ensures it's recognized as a React component,
  // which correctly handles standard React props like 'key' in JSX and prevents assignment errors.
  const MenuItem: React.FC<{ icon: React.ReactNode; label: string; id?: string }> = ({ icon, label, id }) => {
    const isActive = (id === 'home' && location.pathname === '/') || 
                     (id && location.pathname.includes(id));
    
    return (
      <button 
        onClick={() => id === 'home' ? navigate('/') : null}
        className={`w-full flex items-center space-x-5 px-3 py-2.5 rounded-xl transition-colors ${
          isActive ? 'bg-zinc-800 font-medium' : 'hover:bg-zinc-900'
        }`}
      >
        <span className={isActive ? 'text-white' : 'text-zinc-200'}>{icon}</span>
        <span className="text-sm truncate">{label}</span>
      </button>
    );
  };

  if (!isOpen) {
    return (
      <aside className="w-18 flex flex-col items-center py-2 space-y-4 bg-[#0f0f0f] hidden md:flex">
        {NAV_ITEMS.map((item) => (
          <button 
            key={item.id}
            onClick={() => item.id === 'home' ? navigate('/') : null}
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-zinc-900 w-full group"
          >
            {item.icon}
            <span className="text-[10px] mt-1 group-hover:text-white text-zinc-400">{item.label}</span>
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-[#0f0f0f] h-[calc(100vh-56px)] overflow-y-auto no-scrollbar py-2 flex-shrink-0">
      <div className="px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className="my-3 border-t border-zinc-800" />
      
      <div className="px-3 space-y-1">
        <h3 className="px-3 py-2 text-sm font-medium text-zinc-400">You</h3>
        {LIB_ITEMS.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>

      <div className="my-3 border-t border-zinc-800" />
      
      <div className="px-3 space-y-1">
        <h3 className="px-3 py-2 text-sm font-medium text-zinc-400">Subscriptions</h3>
        <div className="flex items-center space-x-4 px-3 py-2 rounded-xl hover:bg-zinc-900 cursor-pointer">
          <img src="https://picsum.photos/seed/c1/32/32" className="w-6 h-6 rounded-full" />
          <span className="text-sm">Fireship</span>
        </div>
        <div className="flex items-center space-x-4 px-3 py-2 rounded-xl hover:bg-zinc-900 cursor-pointer">
          <img src="https://picsum.photos/seed/c2/32/32" className="w-6 h-6 rounded-full" />
          <span className="text-sm">Lex Fridman</span>
        </div>
      </div>

      <div className="my-3 border-t border-zinc-800" />

      <div className="px-3 space-y-1">
        {SETTINGS_ITEMS.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </div>
      
      <div className="px-6 py-4 text-xs text-zinc-500 leading-relaxed font-medium">
        About Press Copyright <br />
        Contact us Creators <br />
        Advertise Developers <br /><br />
        Terms Privacy Policy & Safety <br />
        How GemTube works <br />
        Test new features
        <p className="mt-4 opacity-50">© 2024 Google LLC</p>
      </div>
    </aside>
  );
};

export default Sidebar;
