
import React from 'react';
import { Video, Category, Comment, Modality } from './types';
import { Home, Zap, Layers, Activity, Heart, Shield, Terminal, Globe, Cpu, Radio } from 'lucide-react';

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
    description: 'A deep dive into the latest Asanix Developers silicon-neural hybrid architecture. Understanding the 2050 mesh protocol.',
    category: Category.Technology,
    modality: Modality.VIDEO
  },
  {
    id: 'b1',
    title: 'Neural OS Installation Guide 2050',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400',
    duration: '0:15',
    views: '2M bursts',
    uploadedAt: '5h ago',
    author: {
      name: 'Asanix Dev Support',
      avatar: 'https://i.pravatar.cc/150?u=tech',
      subscribers: '12M'
    },
    description: 'Quick setup for your neural retinal link.',
    category: Category.Technology,
    modality: Modality.BURST
  },
  {
    id: 'l1',
    title: 'FLUX: First Water Discovery on Gale Crater',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800',
    duration: 'LIVE',
    views: '12K in flux',
    uploadedAt: 'Started 20m ago',
    author: {
      name: 'NASA Neural',
      avatar: 'https://i.pravatar.cc/150?u=nasa',
      subscribers: '80M'
    },
    description: 'Watching the first water extraction live from Gale Crater via MarsMesh.',
    category: Category.Space,
    modality: Modality.LIVE,
    liveViewers: '12,400'
  },
  {
    id: 'b2',
    title: 'Zero-G Culinary Experiments',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=400',
    duration: '0:45',
    views: '400K bursts',
    uploadedAt: '1d ago',
    author: {
      name: 'AstroChef 2050',
      avatar: 'https://i.pravatar.cc/150?u=astro',
      subscribers: '1M'
    },
    description: 'Cooking becomes an orbital art form.',
    category: Category.Cooking,
    modality: Modality.BURST
  },
  {
    id: 'f2',
    title: 'The Great Firewall: Global Data Defense',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    duration: '18:05',
    views: '156M flows',
    uploadedAt: '3 cycles ago',
    author: {
      name: 'Cyber Sentinel',
      avatar: 'https://i.pravatar.cc/150?u=sentinel',
      subscribers: '34M'
    },
    description: 'Understanding the Asanix-grade security protocols protecting our global data mesh.',
    category: Category.Technology,
    modality: Modality.VIDEO
  },
  {
    id: 'l2',
    title: 'Asanix Developers Keynote: Project Aether',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    duration: 'LIVE',
    views: '1.2M in flux',
    uploadedAt: 'Started 2h ago',
    author: {
      name: 'Asanix HQ',
      avatar: 'https://i.pravatar.cc/150?u=asanixhq',
      subscribers: '200M'
    },
    description: 'Revealing the new Aether-Mesh protocol live from the Tokyo Dome.',
    category: Category.Technology,
    modality: Modality.LIVE,
    liveViewers: '1.2M'
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'NexusExplorer', avatar: 'https://i.pravatar.cc/150?u=nexus', text: 'The Asanix core is actually faster than my local retinal link. Incredible latency!', likes: 8900, time: '1m' },
  { id: 'c2', author: 'VoidWalker', avatar: 'https://i.pravatar.cc/150?u=void', text: 'Is this 16K neural projection compatible with the Aethex Flows protocol?', likes: 450, time: '12m' }
];

export const NAV_ITEMS = [
  { icon: <Home className="w-5 h-5" />, label: 'Nexus', id: 'home' },
  { icon: <Zap className="w-5 h-5" />, label: 'Burst Feed', id: 'bursts' },
  { icon: <Radio className="w-5 h-5" />, label: 'Live Flux', id: 'live' },
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
