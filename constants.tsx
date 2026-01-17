
import React from 'react';
import { Video, Category, Comment } from './types';
import { Home, Zap, Layers, Activity, Heart, Shield, Terminal, Globe, Cpu, Atom } from 'lucide-react';

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'f1',
    title: 'Quantum Entanglement: A Beginner\'s Guide to Teleportation',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    duration: '08:12',
    views: '45M flows',
    uploadedAt: '2 cycles ago',
    author: {
      name: 'OmniScience',
      avatar: 'https://i.pravatar.cc/150?u=omni',
      subscribers: '12M'
    },
    description: 'Mastering the basics of particle relocation for commercial use.',
    category: Category.Technology
  },
  {
    id: 'f2',
    title: 'Mars Base Alpha: First Contact With Subsurface Liquid',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
    duration: '15:40',
    views: '120M flows',
    uploadedAt: 'Yesterday',
    author: {
      name: 'Interstellar News',
      avatar: 'https://i.pravatar.cc/150?u=mars',
      subscribers: '88M'
    },
    description: 'Historic footage from the Valles Marineris exploration team.',
    category: Category.Space
  },
  {
    id: 'f3',
    title: 'The Rise of Bio-Synthetic Hearts',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda536ad39?auto=format&fit=crop&q=80&w=800',
    duration: '22:15',
    views: '8M flows',
    uploadedAt: '5 days ago',
    author: {
      name: 'LifePlus+',
      avatar: 'https://i.pravatar.cc/150?u=life',
      subscribers: '4M'
    },
    description: 'A documentary on the integration of neural links with biological organs.',
    category: Category.AI
  },
  {
    id: 'f4',
    title: 'Cyber-Jazz: The New Sound of Neo-Tokyo',
    thumbnail: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&q=80&w=800',
    duration: '1:04:12',
    views: '19M flows',
    uploadedAt: '1 month ago',
    author: {
      name: 'SonicWaves',
      avatar: 'https://i.pravatar.cc/150?u=sonic',
      subscribers: '15M'
    },
    description: 'Immersive audio experience from the world\'s first AI-human fusion orchestra.',
    category: Category.Music
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Zenith-9', avatar: 'https://i.pravatar.cc/150?u=z9', text: 'My neural link just peaked during that drop. Insane bandwidth!', likes: 4500, time: '2m' },
  { id: 'c2', author: 'Nova_Prime', avatar: 'https://i.pravatar.cc/150?u=np', text: 'Is this available for retinal projection yet?', likes: 120, time: '15m' }
];

export const NAV_ITEMS = [
  { icon: <Home className="w-5 h-5" />, label: 'Nexus', id: 'home' },
  { icon: <Zap className="w-5 h-5" />, label: 'Burst Feed', id: 'shorts' },
  { icon: <Layers className="w-5 h-5" />, label: 'Sub-Networks', id: 'subs' },
];

export const LIB_ITEMS = [
  { icon: <Activity className="w-5 h-5" />, label: 'Core Log', id: 'history' },
  { icon: <Heart className="w-5 h-5" />, label: 'Sync List', id: 'liked' },
  { icon: <Shield className="w-5 h-5" />, label: 'Vault', id: 'library' },
];

export const SETTINGS_ITEMS = [
  { icon: <Terminal className="w-5 h-5" />, label: 'Root Settings' },
  { icon: <Globe className="w-5 h-5" />, label: 'Global Privacy' },
];
