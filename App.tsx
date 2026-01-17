
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Generate from './pages/Generate';
import History from './pages/History';
import Liked from './pages/Liked';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Channel from './pages/Channel';
import AuthModal from './components/AuthModal';
import { X, Upload, Film, Image as ImageIcon } from 'lucide-react';
import { MOCK_VIDEOS } from './constants';
import { Video, Modality, Category, User } from './types';

const STORAGE_KEY = 'AETHEXFLOW_VIDEOS_V7';
const HISTORY_KEY = 'AETHEXFLOW_HISTORY_V7';
const LIKED_KEY = 'AETHEXFLOW_LIKED_V7';
const SUBS_KEY = 'AETHEXFLOW_SUBS_V7';
const USER_KEY = 'AETHEXFLOW_USER_V7';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : MOCK_VIDEOS;
  });

  const [history, setHistory] = useState<Video[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(LIKED_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [subscribedChannelNames, setSubscribedChannelNames] = useState<string[]>(() => {
    const saved = localStorage.getItem(SUBS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [privacyMode, setPrivacyMode] = useState<'mesh' | 'stealth'>('mesh');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();
  
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    thumbnail: '',
    videoUrl: '',
    modality: Modality.VIDEO,
    category: Category.Technology
  });

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
    localStorage.setItem(SUBS_KEY, JSON.stringify(subscribedChannelNames));
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [videos, history, likedIds, subscribedChannelNames, currentUser]);

  const handleWatchVideo = (video: Video) => {
    setHistory(prev => {
      const filtered = prev.filter(v => v.id !== video.id);
      return [video, ...filtered].slice(0, 50);
    });
  };

  const toggleLike = (videoId: string) => {
    setLikedIds(prev => prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]);
  };

  const toggleSubscribe = (channelName: string) => {
    setSubscribedChannelNames(prev => 
      prev.includes(channelName) ? prev.filter(n => n !== channelName) : [...prev, channelName]
    );
  };

  const openUploadModal = (type: 'VIDEO' | 'REELS' | 'LIVE') => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setNewVideo({
      title: '',
      description: '',
      thumbnail: '',
      videoUrl: '',
      modality: type as Modality,
      category: Category.Technology
    });
    setVideoPreview(null);
    setThumbPreview(null);
    setIsUploadOpen(true);
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setNewVideo(prev => ({ ...prev, videoUrl: url }));
    }
  };

  const handleThumbFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setThumbPreview(url);
      setNewVideo(prev => ({ ...prev, thumbnail: url }));
    }
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const videoToAdd: Video = {
      id: `u-${Date.now()}`,
      ...newVideo,
      thumbnail: newVideo.thumbnail || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      duration: newVideo.modality === Modality.LIVE ? 'LIVE' : (newVideo.modality === Modality.REELS ? '0:30' : '04:20'),
      views: '0 views',
      uploadedAt: 'Just now',
      author: {
        name: currentUser?.name || 'My Channel',
        avatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=node',
        subscribers: '10.5K'
      }
    };
    
    setVideos([videoToAdd, ...videos]);
    setIsUploadOpen(false);
    setVideoPreview(null);
    setThumbPreview(null);
    
    if (newVideo.modality === Modality.REELS) navigate('/reels');
    else if (newVideo.modality === Modality.LIVE) navigate('/live');
    else navigate('/');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050505] text-white">
      <Header 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSearch={(q) => setSearchQuery(q)} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        onOpenUpload={openUploadModal}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} currentUser={currentUser} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative bg-[#050505]">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/reels" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/live" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/watch/:id" element={<Watch videos={videos} onWatch={handleWatchVideo} likedIds={likedIds} onToggleLike={toggleLike} subscribedChannels={subscribedChannelNames} onToggleSubscribe={toggleSubscribe} />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/history" element={<History videos={history} setHistory={setHistory} />} />
            <Route path="/liked" element={<Liked videos={videos.filter(v => likedIds.includes(v.id))} />} />
            <Route path="/library" element={<Library videos={videos.filter(v => v.id.startsWith('u-'))} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<Privacy mode={privacyMode} setMode={setPrivacyMode} />} />
            <Route path="/channel/:id" element={<Channel videos={videos} subscribedChannels={subscribedChannelNames} onToggleSubscribe={toggleSubscribe} />} />
          </Routes>

          {isUploadOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="w-full max-w-5xl glass rounded-[40px] border border-white/10 overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-md z-10">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest font-futuristic">Broadcast to Aethex</h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Initialize data stream for cluster {currentUser?.name}</p>
                  </div>
                  <button onClick={() => setIsUploadOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-7 h-7" /></button>
                </div>
                
                <form onSubmit={handleAddVideo} className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Broadcast Title</label>
                      <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-cyan-500/50 outline-none transition-all font-medium" placeholder="Node stream label..." value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Metadata Description</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm h-40 resize-none focus:border-cyan-500/50 outline-none transition-all font-medium" placeholder="Define stream parameters..." value={newVideo.description} onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-3">
                        <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Sub-category</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm outline-none appearance-none font-bold" value={newVideo.category} onChange={(e) => setNewVideo({...newVideo, category: e.target.value as Category})}>
                          {Object.values(Category).map(cat => <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Stream Format</label>
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm text-cyan-400 font-black uppercase tracking-widest">{newVideo.modality}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Data Fragment (Video)</label>
                      <div className="aspect-video bg-black/40 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center p-6 hover:border-cyan-500/40 transition-all group relative overflow-hidden shadow-inner">
                        {videoPreview ? (
                          <video src={videoPreview} className="absolute inset-0 w-full h-full object-cover" controls />
                        ) : (
                          <>
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Film className="w-8 h-8 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Inject MP4 Stream</p>
                          </>
                        )}
                        <input type="file" accept="video/*" onChange={handleVideoFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Visual Hash (Thumbnail)</label>
                      <div className="flex gap-6 items-start">
                        <div className="flex-1 aspect-video bg-black/40 border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-purple-500/40 transition-all">
                          {thumbPreview ? (
                             <img src={thumbPreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-zinc-700 group-hover:text-purple-400 transition-colors" />
                          )}
                          <input type="file" accept="image/*" onChange={handleThumbFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                        <div className="flex-[1.5] space-y-4">
                           <p className="text-[10px] text-zinc-500 font-bold leading-relaxed uppercase">Provide a custom frame or neural link below.</p>
                           <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none focus:border-purple-500/50 font-bold" placeholder="Neural link..." value={newVideo.thumbnail} onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 text-black py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all flex items-center justify-center space-x-4 shadow-[0_10px_30px_rgba(0,242,255,0.2)]">
                      <Upload className="w-5 h-5" />
                      <span>Sync to Global Mesh</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={() => setIsAuthOpen(false)} 
            onLogin={setCurrentUser} 
          />
        </main>
      </div>
    </div>
  );
};

export default App;
