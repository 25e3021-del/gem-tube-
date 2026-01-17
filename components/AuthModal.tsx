
import React, { useState } from 'react';
import { X, Mail, Lock, User, Cpu, ArrowRight } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      id: 'me',
      name: name || 'Aethex_Node',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name || 'me'}`,
      email: email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-md glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-widest font-futuristic text-cyan-400">
              {isSignUp ? 'Initialize Node' : 'Access Network'}
            </h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
              {isSignUp ? 'Create your neural identifier' : 'Authenticate to your cluster'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Identifier Name</label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  required
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all"
                  placeholder="e.g. Node_01"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Protocol Email</label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                required
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all"
                placeholder="node@aethex.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-4">Access Code</label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                required
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20">
            <span>{isSignUp ? 'Initialize' : 'Authenticate'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] font-black text-zinc-500 hover:text-cyan-400 uppercase tracking-widest transition-colors"
            >
              {isSignUp ? 'Already authenticated? Access here' : 'New node? Initialize identifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
