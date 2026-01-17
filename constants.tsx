
import React from 'react';
import { Video, Category, Comment } from './types';
import { Home, Zap, Layers, Activity, Heart, Shield, Terminal, Globe, Cpu, Atom } from 'lucide-react';

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'f1',
    title: 'Asanix Quantum Core: The Future of Neural Processing',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
    duration: '12:45',
    views: '890M flows',
    uploadedAt: '2 cycles ago',
    author: {
      name: 'Asanix Labs',
      avatar: 'https://i.pravatar.cc/150?u=asanix',
      subscribers: '150M'
    },
    description: 'A deep dive into the latest Asanix Developers silicon-neural hybrid architecture.',
    category: Category.Technology
  },
  {
    id: 'f2',
    title: 'Interstellar Drift: Live from the Andromeda Gateway',
    thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=800',
    duration: 'LIVE',
    views: '2B flows',
    uploadedAt: 'Ongoing',
    author: {
      name: 'DeepSpace Network',
      avatar: 'https://i.pravatar.cc/150?u=space',
      subscribers: '500M'
    },
    description: 'High-fidelity visual stream from the edge of our local cluster.',
    category: Category.Space
  },
  {
    id: 'f3',
    title: 'Synthesizing Emotion: AI Music for the Soul',
    thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800',
    duration: '45:20',
    views: '12M flows',
    uploadedAt: '5 cycles ago',
    author: {
      name: 'Neural Melodies',
      avatar: 'https://i.pravatar.cc/150?u=music',
      subscribers: '8M'
    },
    description: 'Experience sounds generated directly from neural feedback loops.',
    category: Category.Music
  },
  {
    id: 'f4',
    title: 'Neo-Tokyo Survival: A Cyber-Traveler\'s Log',
    thumbnail: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=800',
    duration: '22:10',
    views: '45M flows',
    uploadedAt: '1 cycle ago',
    author: {
      name: 'Vagabond 2050',
      avatar: 'https://i.pravatar.cc/150?u=vaga',
      subscribers: '2M'
    },
    description: 'Tips for navigating the high-density grid sectors of the new capital.',
    category: Category.Travel
  },
  {
    id: 'f5',
    title: 'The Great Firewall: Defending the Global Mesh',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    duration: '18:05',
    views: '156M flows',
    uploadedAt: '3 cycles ago',
    author: {
      name: 'Cyber Sentinel',
      avatar: 'https://i.pravatar.cc/150?u=sentinel',
      subscribers: '34M'
    },
    description: 'Understanding the Asanix-grade security protocols protecting our data.',
    category: Category.Technology
  },
  {
    id: 'f6',
    title: 'Culinary Synthesis: 3D Printing Gourmet Meals',
    thumbnail: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
    duration: '08:50',
    views: '5M flows',
    uploadedAt: '1 cycle ago',
    author: {
      name: 'Future Chef',
      avatar: 'https://i.pravatar.cc/150?u=chef',
      subscribers: '1M'
    },
    description: 'How to calibrate your molecular printer for the perfect Wagyu steak.',
    category: Category.Cooking
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'NexusExplorer', avatar: 'https://i.pravatar.cc/150?u=nexus', text: 'The Asanix core is actually faster than my local retinal link. Incredible latency!', likes: 8900, time: '1m' },
  { id: 'c2', author: 'VoidWalker', avatar: 'https://i.pravatar.cc/150?u=void', text: 'Is this 16K neural projection compatible?', likes: 450, time: '12m' }
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
