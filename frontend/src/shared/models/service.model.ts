export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  category: 'medical' | 'beauty';
  createdAt: Date;
}
