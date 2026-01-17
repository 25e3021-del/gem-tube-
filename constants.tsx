
import React from 'react';
import { Video, Category, Comment } from './types';
import { Home, Compass, PlayCircle, Clock, ThumbsUp, Library, User, Settings, Flag, HelpCircle, MessageSquare } from 'lucide-react';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'The Future of AI: Beyond Large Language Models',
    thumbnail: 'https://picsum.photos/seed/ai1/640/360',
    duration: '12:45',
    views: '1.2M views',
    uploadedAt: '2 days ago',
    author: {
      name: 'TechInsights',
      avatar: 'https://picsum.photos/seed/auth1/100/100',
      subscribers: '450K'
    },
    description: 'Explore the next frontier of artificial intelligence, from multimodal models to neuro-symbolic reasoning.',
    category: Category.AI
  },
  {
    id: '2',
    title: 'How to Build a YouTube Clone in 10 Minutes',
    thumbnail: 'https://picsum.photos/seed/coding1/640/360',
    duration: '10:00',
    views: '850K views',
    uploadedAt: '1 week ago',
    author: {
      name: 'CodeMaster',
      avatar: 'https://picsum.photos/seed/auth2/100/100',
      subscribers: '1.2M'
    },
    description: 'Learn the fundamentals of React and Tailwind CSS by building a fully functional video platform.',
    category: Category.Coding
  },
  {
    id: '3',
    title: 'Lo-Fi Hip Hop Beats for Studying & Relaxation',
    thumbnail: 'https://picsum.photos/seed/music1/640/360',
    duration: '24:00',
    views: '10M views',
    uploadedAt: '1 month ago',
    author: {
      name: 'Lofi Vibes',
      avatar: 'https://picsum.photos/seed/auth3/100/100',
      subscribers: '5M'
    },
    description: 'The best lo-fi beats to help you focus or chill out during long study sessions.',
    category: Category.Music
  },
  {
    id: '4',
    title: 'James Webb Space Telescope: New Discovery',
    thumbnail: 'https://picsum.photos/seed/space1/640/360',
    duration: '15:20',
    views: '3.4M views',
    uploadedAt: '3 days ago',
    author: {
      name: 'Cosmos News',
      avatar: 'https://picsum.photos/seed/auth4/100/100',
      subscribers: '2.1M'
    },
    description: 'NASA reveals stunning new images and data from the deepest parts of our universe.',
    category: Category.Space
  },
  {
    id: '5',
    title: 'Authentic Homemade Ramen - Master Class',
    thumbnail: 'https://picsum.photos/seed/cook1/640/360',
    duration: '18:45',
    views: '2.1M views',
    uploadedAt: '5 days ago',
    author: {
      name: 'Chef Maria',
      avatar: 'https://picsum.photos/seed/auth5/100/100',
      subscribers: '980K'
    },
    description: 'From scratch noodles to the perfect 24-hour broth. This is the ultimate guide to ramen.',
    category: Category.Cooking
  },
  {
    id: '6',
    title: 'Top 10 Hidden Gems in Switzerland',
    thumbnail: 'https://picsum.photos/seed/travel1/640/360',
    duration: '11:10',
    views: '1.5M views',
    uploadedAt: '2 weeks ago',
    author: {
      name: 'Globe Trotter',
      avatar: 'https://picsum.photos/seed/auth6/100/100',
      subscribers: '1.5M'
    },
    description: 'Forget Zurich and Geneva, these are the most beautiful secret locations in Switzerland.',
    category: Category.Travel
  },
  {
    id: '7',
    title: 'RTX 5090 vs Everything: Performance Leak',
    thumbnail: 'https://picsum.photos/seed/tech1/640/360',
    duration: '14:22',
    views: '2.8M views',
    uploadedAt: '4 hours ago',
    author: {
      name: 'Hardware Guru',
      avatar: 'https://picsum.photos/seed/auth7/100/100',
      subscribers: '3.2M'
    },
    description: 'Breaking down the latest performance metrics for the upcoming flagship GPU.',
    category: Category.Technology
  },
  {
    id: '8',
    title: 'The History of Ancient Rome: Full Documentary',
    thumbnail: 'https://picsum.photos/seed/edu1/640/360',
    duration: '1:45:00',
    views: '5.2M views',
    uploadedAt: '1 year ago',
    author: {
      name: 'History Unearthed',
      avatar: 'https://picsum.photos/seed/auth8/100/100',
      subscribers: '4.5M'
    },
    description: 'An in-depth look at the rise and fall of one of history\'s greatest empires.',
    category: Category.Education
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'John Doe', avatar: 'https://picsum.photos/seed/u1/40/40', text: 'This is incredible! The level of detail is amazing.', likes: 124, time: '2 hours ago' },
  { id: 'c2', author: 'Jane Smith', avatar: 'https://picsum.photos/seed/u2/40/40', text: 'Does anyone know the track playing at 5:30?', likes: 45, time: '1 hour ago' },
  { id: 'c3', author: 'Alex Tech', avatar: 'https://picsum.photos/seed/u3/40/40', text: 'I\'ve been waiting for a video like this for so long. Great job!', likes: 231, time: '5 hours ago' },
];

export const NAV_ITEMS = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', id: 'home' },
  { icon: <Compass className="w-5 h-5" />, label: 'Shorts', id: 'shorts' },
  { icon: <PlayCircle className="w-5 h-5" />, label: 'Subscriptions', id: 'subs' },
];

export const LIB_ITEMS = [
  { icon: <Library className="w-5 h-5" />, label: 'Library', id: 'library' },
  { icon: <Clock className="w-5 h-5" />, label: 'History', id: 'history' },
  { icon: <ThumbsUp className="w-5 h-5" />, label: 'Liked Videos', id: 'liked' },
];

export const SETTINGS_ITEMS = [
  { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  { icon: <Flag className="w-5 h-5" />, label: 'Report History' },
  { icon: <HelpCircle className="w-5 h-5" />, label: 'Help' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Feedback' },
];
