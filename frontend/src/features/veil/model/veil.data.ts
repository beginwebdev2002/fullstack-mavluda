export interface Veil {
  id?: string;
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

export const veilFormData: Veil = {
  id: "",
  name: "Just Name of Veil",
  sku: "lorem",
  price: 2500,
  stock: 10,
  images: ["image_url"],
  silhouette: "lorem",
  neckline: "lorem",
  fabric: "lorem",
  trainLength: "lorem",
  category: "Bridal",
  isAvailable: true,
  description: "lorem",
};

export const resetVeilData: Veil = {
  id: "",
  name: "",
  sku: "",
  price: 0,
  stock: 0,
  images: [],
  silhouette: "",
  neckline: "",
  fabric: "",
  trainLength: "",
  category: "",
  isAvailable: true,
  description: "",
};
