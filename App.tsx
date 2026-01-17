
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { Sparkles, X, Send, Loader2, Upload, Globe, Shield } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_VIDEOS } from './constants';
import { Video, Modality, Category } from './types';

const STORAGE_KEY = 'AETHEXFLOW_DATA_V1';
const HISTORY_KEY = 'AETHEXFLOW_HISTORY_V1';
const LIKED_KEY = 'AETHEXFLOW_LIKED_V1';

const App: React.FC = () => {
  // Persistence Logic
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

  const [privacyMode, setPrivacyMode] = useState<'mesh' | 'stealth'>('mesh');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();
  
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    thumbnail: '',
    modality: Modality.VIDEO,
    category: Category.Technology
  });

  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Identity confirmed. Welcome to Aethex Flows. Your signals are currently persistent in this local node.' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds));
  }, [likedIds]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleWatchVideo = (video: Video) => {
    setHistory(prev => {
      const filtered = prev.filter(v => v.id !== video.id);
      return [video, ...filtered].slice(0, 50);
    });
  };

  const toggleLike = (videoId: string) => {
    setLikedIds(prev => prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]);
  };

  const openUploadModal = (type: 'VIDEO' | 'BURST' | 'LIVE') => {
    setNewVideo(prev => ({ ...prev, modality: type as Modality }));
    setIsUploadOpen(true);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const videoToAdd: Video = {
      id: `u-${Date.now()}`,
      ...newVideo,
      duration: newVideo.modality === Modality.LIVE ? 'LIVE' : (newVideo.modality === Modality.BURST ? '0:30' : '04:20'),
      views: '0 flows',
      uploadedAt: 'Just now',
      author: {
        name: 'Mesh User',
        avatar: 'https://i.pravatar.cc/150?u=user-node',
        subscribers: '0'
      },
      liveViewers: newVideo.modality === Modality.LIVE ? '0' : undefined
    };
    
    setVideos([videoToAdd, ...videos]);
    setIsUploadOpen(false);
    
    if (newVideo.modality === Modality.BURST) navigate('/bursts');
    else if (newVideo.modality === Modality.LIVE) navigate('/live');
    else navigate('/');

    setNewVideo({
      title: '',
      description: '',
      thumbnail: '',
      modality: Modality.VIDEO,
      category: Category.Technology
    });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: { systemInstruction: "You are the Aethex Flows Neural Guide. Helping users publish signals." }
      });
      setChatHistory(prev => [...prev, { role: 'ai', text: response.text || 'Signal lost.' }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Uplink failure.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050505] text-white">
      <Header 
        onSearch={(q) => setSearchQuery(q)} 
        onToggleSidebar={toggleSidebar} 
        onOpenUpload={openUploadModal}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative bg-[#050505]">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/bursts" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/live" element={<Home searchQuery={searchQuery} videos={videos} />} />
            <Route path="/watch/:id" element={<Watch videos={videos} onWatch={handleWatchVideo} likedIds={likedIds} onToggleLike={toggleLike} />} />
            <Route path="/generate" element={<Generate />} />
            <Route path="/history" element={<History videos={history} setHistory={setHistory} />} />
            <Route path="/liked" element={<Liked videos={videos.filter(v => likedIds.includes(v.id))} />} />
            <Route path="/library" element={<Library videos={videos.filter(v => v.id.startsWith('u-'))} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<Privacy mode={privacyMode} setMode={setPrivacyMode} />} />
            <Route path="/channel/:id" element={<Channel videos={videos} />} />
          </Routes>

          {/* Creation Modal */}
          {isUploadOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
              <div className="w-full max-w-2xl glass rounded-[40px] border border-cyan-500/30 overflow-hidden shadow-[0_0_100px_rgba(0,242,255,0.1)]">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                      <Upload className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-widest uppercase font-futuristic">Neural Ingester</h3>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Asanix Developers Protocol v9</p>
                    </div>
                  </div>
                  <button onClick={() => setIsUploadOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all">
                    <X className="w-7 h-7" />
                  </button>
                </div>
                
                <form onSubmit={handleAddVideo} className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Construct Name</label>
                      <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all placeholder-zinc-700" placeholder="Ex: New Signal 2050" value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Signal Type</label>
                      <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-2xl border border-white/5">
                        {['VIDEO', 'BURST', 'LIVE'].map(t => (
                          <button key={t} type="button" onClick={() => setNewVideo({ ...newVideo, modality: t as Modality })} className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${newVideo.modality === t ? 'bg-cyan-500 text-black' : 'text-zinc-500 hover:text-white'}`}>{t}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Visibility</label>
                      <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                        {privacyMode === 'mesh' ? <Globe className="w-4 h-4 text-cyan-400" /> : <Shield className="w-4 h-4 text-purple-400" />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{privacyMode === 'mesh' ? 'Mesh Public' : 'Stealth Local'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Summary</label>
                      <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all h-32 resize-none placeholder-zinc-700" placeholder="Summary..." value={newVideo.description} onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Visual Frame (URL)</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-cyan-500/50 outline-none transition-all placeholder-zinc-700" placeholder="https://..." value={newVideo.thumbnail} onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full bg-white text-black py-5 rounded-[20px] font-black text-xs uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all flex items-center justify-center space-x-3">
                      <Sparkles className="w-4 h-4" />
                      <span>Sync Signal</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Floating Toggle */}
          <button onClick={() => setIsGuideOpen(!isGuideOpen)} className={`fixed bottom-8 right-8 z-[100] group transition-all duration-500 ${isGuideOpen ? 'scale-0' : 'scale-100'}`}>
            <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20"></div>
            <div className="relative glass p-4 rounded-full border border-cyan-500/30 group-hover:scale-110 shadow-2xl">
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </div>
          </button>
        </main>
      </div>
    </div>
  );
};

export default App;
