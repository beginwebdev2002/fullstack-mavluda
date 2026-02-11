export type ImageStatus = 'published' | 'draft';
export type ImageCategory = 'All' | 'Visage' | 'Medical Spa' | 'Bridal Veils' | 'Interior' | 'Product';

export interface Gallery {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  tags: string[];
  status: string;
  alt: string;
  filename: string;
  createdAt: string; // Date string from backend
}
