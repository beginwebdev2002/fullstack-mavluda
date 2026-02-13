export interface Veil {
  id?: string;
  name: string;
  description?: string;
  price: number;
  rentalPrice: number;
  images?: string[];
  category: string;
  isAvailable: boolean;
  sku: string;
  silhouette: string;
  neckline: string;
  fabric: string;
  trainLength: string;
  stock: number;
}

export const veilFormData: Veil = {
  name: "Just Name of Veil",
  sku: "lorem",
  price: 2500,
  rentalPrice: 1000,
  stock: 10,
  silhouette: "lorem",
  neckline: "lorem",
  fabric: "lorem",
  trainLength: "lorem",
  category: "Bridal",
  isAvailable: true,
  description: "lorem",
};

export const resetVeilData: Veil = {
  name: "",
  sku: "",
  price: 0,
  rentalPrice: 0,
  stock: 0,
  silhouette: "",
  neckline: "",
  fabric: "",
  trainLength: "",
  category: "",
  isAvailable: true,
  description: "",
};
