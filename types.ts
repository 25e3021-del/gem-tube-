
export enum Modality {
  VIDEO = 'VIDEO',
  REELS = 'REELS',
  LIVE = 'LIVE',
  IMAGE = 'IMAGE'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadedAt: string;
  author: {
    name: string;
    avatar: string;
    subscribers: string;
  };
  description: string;
  category: string;
  modality: Modality;
  liveViewers?: string;
  videoUrl?: string;
}

export enum Category {
  All = 'All',
  Music = 'Music',
  Gaming = 'Gaming',
  Coding = 'Coding',
  Technology = 'Technology',
  AI = 'AI',
  Education = 'Education',
  Space = 'Space',
  Cooking = 'Cooking',
  Travel = 'Travel',
  Photos = 'Photos'
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}
