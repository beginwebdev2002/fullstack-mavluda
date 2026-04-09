export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'medical' | 'beauty';
  createdAt: Date;
}
