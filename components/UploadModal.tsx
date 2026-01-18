
import React, { useState } from 'react';
import { X, Upload, Video as VideoIcon } from 'lucide-react';
import { Modality, Category, User, Video } from '../types';

interface UploadModalProps {
  currentUser: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUpload: (video: Video) => void;
  initialModality: Modality;
}

const UploadModal: React.FC<UploadModalProps> = ({ currentUser, isOpen, onClose, onUpload, initialModality }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    category: Category.Technology,
    modality: initialModality
  });

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVideo: Video = {
      id: `u-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      duration: formData.modality === Modality.REELS ? '0:30' : '04:20',
      views: '0 views',
      uploadedAt: 'Just now',
      category: formData.category,
      modality: formData.modality,
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        subscribers: currentUser.subscribers || '0'
      }
    };
    onUpload(newVideo);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-4xl glass rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-cyan-500/20 rounded-xl">
               <VideoIcon className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase font-futuristic tracking-widest text-cyan-400">Broadcast Origin</h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Node ID: {currentUser.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Stream Label</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" placeholder="Enter title..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Data Payload (Description)</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-40 outline-none focus:border-cyan-500/50 transition-all resize-none" placeholder="Describe content..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Sector (Category)</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 appearance-none font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as Category})}>
                  {Object.values(Category).map(c => <option key={c} value={c} className="bg-zinc-900">{c}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Visual Link (Thumbnail URL)</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-all" placeholder="https://..." value={formData.thumbnail} onChange={e => setFormData({...formData, thumbnail: e.target.value})} />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 text-black py-5 rounded-[20px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all">
                  <Upload className="w-5 h-5" />
                  <span>Initialize Stream</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
