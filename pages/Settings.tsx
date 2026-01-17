
import React from 'react';
import { Terminal, User, Shield, Globe, Bell, Cpu, Zap } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-2xl border-white/10">
            <Terminal className="w-8 h-8 text-white/50" />
          </div>
          <div>
            <h1 className="text-3xl font-black font-futuristic uppercase tracking-tighter italic">App Settings</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Manage Your Profile and Account</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: <User className="w-5 h-5" />, title: "Account Info", desc: "Manage your profile name and avatar", color: "text-cyan-400" },
            { icon: <Shield className="w-5 h-5" />, title: "Security", desc: "Protect your account and data", color: "text-purple-400" },
            { icon: <Bell className="w-5 h-5" />, title: "Notifications", desc: "Choose what alerts you get", color: "text-red-400" },
            { icon: <Cpu className="w-5 h-5" />, title: "Device Sync", desc: "Connect your phone and other devices", color: "text-zinc-400" },
            { icon: <Globe className="w-5 h-5" />, title: "Location", desc: "Region and language settings", color: "text-green-400" },
          ].map((item, idx) => (
            <button key={idx} className="w-full flex items-center justify-between p-6 glass rounded-3xl hover:bg-white/5 transition-all group border-white/5 text-left">
              <div className="flex items-center space-x-6">
                <div className={`p-3 rounded-2xl bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">{item.desc}</p>
                </div>
              </div>
              <Zap className="w-4 h-4 text-zinc-800 group-hover:text-cyan-400 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
