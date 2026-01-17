
export enum Modality {
  VIDEO = 'VIDEO',
  BURST = 'BURST',
  LIVE = 'LIVE'
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
  Travel = 'Travel'
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
}
