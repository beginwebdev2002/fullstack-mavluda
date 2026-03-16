export type ImageStatus = "published" | "draft";
export type ImageCategory =
  | "all"
  | "visage"
  | "medical_spa"
  | "bridal_veils"
  | "interior"
  | "product";

export interface Gallery {
  id?: string;
  title: string;
  imageUrl: string;
  category: string;
  status: string;
  alt: string;
  createdAt?: string; // Date string from backend
}
