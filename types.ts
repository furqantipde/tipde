
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'Text' | 'SEO' | 'Dev' | 'Images' | 'Other';
  icon: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export type View = 'home' | 'about' | 'mission' | 'tools' | 'contact' | 'admin' | 'legal';
