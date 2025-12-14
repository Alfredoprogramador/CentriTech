export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'decantadora' | 'separadora' | 'filtradora';
  imageUrl: string;
  specs: string[]; // Resumo para o card
  // Novos campos para detalhes
  longDescription?: string;
  galleryImages?: string[];
  technicalData?: { label: string; value: string }[];
  features?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Section {
  HOME = 'home',
  PRODUCTS = 'products',
  SERVICES = 'services',
  ABOUT = 'about',
  CONTACT = 'contact',
  AI_CONSULTANT = 'ai-consultant'
}