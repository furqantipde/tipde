
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  type: 'text' | 'image';
  imageUrl?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export enum AppRoute {
  HOME = '/',
  CHAT = '/chat',
  PRIVACY = '/privacy',
  TERMS = '/terms',
  ABOUT = '/about',
  CONTACT = '/contact'
}
