
import { useState, useEffect } from 'react';
import { Video, User } from '../types';
import { MOCK_VIDEOS } from '../constants';

const KEYS = {
  VIDEOS: 'AETHEX_V8_VIDEOS',
  HISTORY: 'AETHEX_V8_HISTORY',
  LIKED: 'AETHEX_V8_LIKED',
  SUBS: 'AETHEX_V8_SUBS',
  USER: 'AETHEX_V8_USER'
};

export const usePersistence = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(KEYS.USER);
    return saved ? JSON.parse(saved) : null;
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem(KEYS.VIDEOS);
    return saved ? JSON.parse(saved) : MOCK_VIDEOS;
  });

  const [history, setHistory] = useState<Video[]>(() => {
    const saved = localStorage.getItem(KEYS.HISTORY);
    return saved ? JSON.parse(saved) : [];
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem(KEYS.LIKED);
    return saved ? JSON.parse(saved) : [];
  });

  const [subscribedChannels, setSubscribedChannels] = useState<string[]>(() => {
    const saved = localStorage.getItem(KEYS.SUBS);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEYS.VIDEOS, JSON.stringify(videos));
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
    localStorage.setItem(KEYS.LIKED, JSON.stringify(likedIds));
    localStorage.setItem(KEYS.SUBS, JSON.stringify(subscribedChannels));
    if (currentUser) localStorage.setItem(KEYS.USER, JSON.stringify(currentUser));
    else localStorage.removeItem(KEYS.USER);
  }, [videos, history, likedIds, subscribedChannels, currentUser]);

  const addVideo = (video: Video) => setVideos(prev => [video, ...prev]);
  
  const recordHistory = (video: Video) => {
    setHistory(prev => [video, ...prev.filter(v => v.id !== video.id)].slice(0, 50));
  };

  const toggleLike = (id: string) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSubscribe = (name: string) => {
    setSubscribedChannels(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);
  };

  return {
    currentUser, setCurrentUser,
    videos, setVideos, addVideo,
    history, setHistory, recordHistory,
    likedIds, toggleLike,
    subscribedChannels, toggleSubscribe
  };
};
