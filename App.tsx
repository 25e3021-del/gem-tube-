
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Generate from './pages/Generate';
import History from './pages/History';
import Liked from './pages/Liked';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Privacy from './pages/Privacy';
import Channel from './pages/Channel';
import Subscriptions from './pages/Subscriptions';
import AuthModal from './components/AuthModal';
import UploadModal from './components/UploadModal';
import { usePersistence } from './hooks/usePersistence';
import { Video, Modality } from './types';

const App: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentUser, setCurrentUser, 
    videos, addVideo, 
    history, setHistory, recordHistory,
    likedIds, toggleLike,
    subscribedChannels, toggleSubscribe
  } = usePersistence();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeUploadModality, setActiveUploadModality] = useState<Modality>(Modality.VIDEO);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenUpload = (type: 'VIDEO' | 'REELS' | 'LIVE') => {
    if (!currentUser) return setIsAuthOpen(true);
    setActiveUploadModality(type as Modality);
    setIsUploadOpen(true);
  };

  const handleUploadComplete = (newVideo: Video) => {
    addVideo(newVideo);
    setIsUploadOpen(false);
    navigate('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <Layout 
      currentUser={currentUser} 
      subscribedChannels={subscribedChannels}
      onOpenAuth={() => setIsAuthOpen(true)}
      onSearch={setSearchQuery}
      onOpenUpload={handleOpenUpload}
      onLogout={handleLogout}
    >
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} videos={videos} />} />
        <Route path="/reels" element={<Home searchQuery={searchQuery} videos={videos} />} />
        <Route path="/live" element={<Home searchQuery={searchQuery} videos={videos} />} />
        <Route path="/subscriptions" element={<Subscriptions videos={videos} subscribedChannels={subscribedChannels} />} />
        <Route path="/watch/:id" element={
          <Watch 
            videos={videos} 
            onWatch={recordHistory} 
            likedIds={likedIds} 
            onToggleLike={toggleLike} 
            subscribedChannels={subscribedChannels} 
            onToggleSubscribe={toggleSubscribe} 
          />
        } />
        <Route path="/generate" element={<Generate />} />
        <Route path="/history" element={<History videos={history} setHistory={setHistory} />} />
        <Route path="/liked" element={<Liked videos={videos.filter(v => likedIds.includes(v.id))} />} />
        <Route path="/library" element={<Library videos={videos.filter(v => v.id.startsWith('u-'))} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/privacy" element={<Privacy mode="mesh" setMode={() => {}} />} />
        <Route path="/channel/:id" element={<Channel videos={videos} subscribedChannels={subscribedChannels} onToggleSubscribe={toggleSubscribe} />} />
      </Routes>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={setCurrentUser} />
      
      <UploadModal 
        isOpen={isUploadOpen} 
        currentUser={currentUser}
        initialModality={activeUploadModality}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUploadComplete}
      />
    </Layout>
  );
};

export default App;
