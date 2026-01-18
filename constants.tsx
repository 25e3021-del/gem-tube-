
import React from 'react';
import { Video, Category, Modality } from './types';
import { Home as HomeIcon, Zap, Activity, Heart, Library as LibraryIcon, Terminal, Shield, Radio } from 'lucide-react';

const authors = [
  { name: 'Pixel_Pilot', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PixelPilot' },
  { name: 'Neural_Nomad', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NeuralNomad' },
  { name: 'Data_Ghost', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DataGhost' },
  { name: 'Asanix_Bot_01', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AsanixBot' },
  { name: 'Cyber_Scribe', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberScribe' },
  { name: 'Flux_Engineer', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=FluxEngineer' },
];

const categories = Object.values(Category).filter(c => c !== Category.All);

const generateMockData = () => {
  const data: Video[] = [];

  // 150 VIDEOS
  for (let i = 1; i <= 150; i++) {
    const author = authors[i % authors.length];
    data.push({
      id: `v-${i}`,
      title: `Neural Stream Fragment #${i}: ${['Deep Learning', 'Quantum Mesh', 'Aethex Protocol', 'Neural Synthesis'][i % 4]}`,
      thumbnail: `https://picsum.photos/seed/vid${i}/800/450`,
      duration: `${Math.floor(Math.random() * 20) + 1}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
      views: `${(Math.random() * 999).toFixed(1)}M views`,
      uploadedAt: `${Math.floor(Math.random() * 24)}h ago`,
      author: { ...author, subscribers: `${(Math.random() * 100).toFixed(1)}M` },
      description: `Software check automated fragment. This is a non-copyright test video for project verification. Sequence ID: ${Math.random().toString(36).substring(7)}`,
      category: categories[i % categories.length],
      modality: Modality.VIDEO
    });
  }

  // 150 REELS
  for (let i = 1; i <= 150; i++) {
    const author = authors[i % authors.length];
    data.push({
      id: `r-${i}`,
      title: `Burst #${i}: Quick Logic Sync`,
      thumbnail: `https://picsum.photos/seed/reel${i}/400/711`,
      duration: '0:15',
      views: `${(Math.random() * 50).toFixed(1)}M`,
      uploadedAt: 'Recent',
      author: { ...author, subscribers: 'Hidden' },
      description: 'Short form content test.',
      category: Category.Technology,
      modality: Modality.REELS
    });
  }

  return data;
};

export const MOCK_VIDEOS: Video[] = generateMockData();

export const NAV_ITEMS = [
  { icon: <HomeIcon className="w-5 h-5" />, label: 'Home', id: 'home' },
  { icon: <Zap className="w-5 h-5" />, label: 'Reels', id: 'reels' },
  { icon: <Radio className="w-5 h-5" />, label: 'Live', id: 'live' },
];

export const LIB_ITEMS = [
  { icon: <Activity className="w-5 h-5" />, label: 'History', id: 'history' },
  { icon: <Heart className="w-5 h-5" />, label: 'Liked', id: 'liked' },
  { icon: <LibraryIcon className="w-5 h-5" />, label: 'Library', id: 'library' },
];

export const SETTINGS_ITEMS = [
  { icon: <Terminal className="w-5 h-5" />, label: 'Settings', id: 'settings' },
  { icon: <Shield className="w-5 h-5" />, label: 'Privacy', id: 'privacy' },
];
