export interface Veil {
  id: string;
  name: string;
  description?: string;
  price: number;
  rentalPrice?: number;
  images: string[]; 
  category: string;
  isAvailable: boolean;
  sku: string;
  silhouette: string;
  neckline: string;
  fabric: string;
  trainLength: string;
  stock: number;
}
