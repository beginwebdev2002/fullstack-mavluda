export interface Veil {
  id: string;
  name: string;
  description?: string;
  price: number;
  rentalPrice?: number;
  // Backend has images[], frontend currently uses single image in some places, 
  // but we should support array.
  images: string[]; 
  category: string;
  isAvailable: boolean;
  sku?: string;
  silhouette?: string;
  neckline?: string;
  fabric?: string;
  trainLength?: string;
  stock?: number;
}
