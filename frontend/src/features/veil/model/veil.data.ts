export interface Veil {
  id?: string;
  name: string;
  description?: string;
  price: number;
  rentalPrice: number;
  image?: string;
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
  name: "Royal Silk Majesty",
  sku: "AWR-2026-RSM",
  price: 2500,
  rentalPrice: 800,
  stock: 10,
  silhouette: "Ball Gown",
  neckline: "Off-the-shoulder",
  fabric: "Silk",
  trainLength: "Cathedral",
  category: "Bridal",
  isAvailable: true,
  description:
    "A regal ball gown veil crafted from the finest silk, cascading in majestic folds. The off-the-shoulder design drapes elegantly, framing the face with timeless sophistication. A cathedral-length train adds a touch of royal grandeur, making it the perfect statement piece for the modern bride seeking luxury and grace.",
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
