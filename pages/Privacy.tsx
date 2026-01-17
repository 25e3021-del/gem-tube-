
import React from 'react';
import { Shield, Globe, EyeOff, Lock, Zap, Cpu } from 'lucide-react';

interface PrivacyProps {
  mode: 'mesh' | 'stealth';
  setMode: (mode: 'mesh' | 'stealth') => void;
}

const Privacy: React.FC<PrivacyProps> = ({ mode, setMode }) => {
  return (
    <div className="flex-1 min-h-screen bg-[#050505] p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-6 mb-16">
          <div className="p-4 glass rounded-3xl border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
            <Shield className="w-10 h-10 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black font-futuristic uppercase tracking-tighter italic">Privacy & Security</h1>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Manage Your Visibility Online</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <button 
            onClick={() => setMode('mesh')}
            className={`p-8 rounded-[40px] border transition-all text-left relative overflow-hidden group ${
              mode === 'mesh' 
                ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_50px_rgba(0,242,255,0.1)]' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="relative z-10">
              <div className={`p-4 rounded-2xl inline-block mb-6 ${mode === 'mesh' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-zinc-500'}`}>
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-2 font-futuristic">Public Mode</h3>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Your videos are shared with everyone on the platform.</p>
            </div>
          </button>

          <button 
            onClick={() => setMode('stealth')}
            className={`p-8 rounded-[40px] border transition-all text-left relative overflow-hidden group ${
              mode === 'stealth' 
                ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_50px_rgba(112,0,255,0.1)]' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}
          >
            <div className="relative z-10">
              <div className={`p-4 rounded-2xl inline-block mb-6 ${mode === 'stealth' ? 'bg-purple-500 text-black' : 'bg-white/5 text-zinc-500'}`}>
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest mb-2 font-futuristic">Private Mode</h3>
              <p className="text-xs text-zinc-500 font-bold leading-relaxed">Your videos are kept private and visible only to you.</p>
            </div>
          </button>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">Settings List</h4>
          {[
            { icon: <EyeOff className="w-5 h-5" />, label: "Hide Profile Image", status: "Enabled" },
            { icon: <Zap className="w-5 h-5" />, label: "Quantum Encryption", status: "Active" },
            { icon: <Shield className="w-5 h-5" />, label: "App Firewall", status: "Enabled" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 glass rounded-3xl border-white/5">
              <div className="flex items-center space-x-6">
                <div className="text-zinc-500">{item.icon}</div>
                <span className="text-xs font-black uppercase tracking-widest text-white/80">{item.label}</span>
              </div>
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
