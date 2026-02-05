export interface Veil {
  id: string;
  name: string;
  description: string;
  price: number;
  rentalPrice: number;
  images: string[];
  category: string;
  isAvailable: boolean;
  createdAt: Date;
}
