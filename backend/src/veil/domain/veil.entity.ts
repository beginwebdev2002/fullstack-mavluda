export interface VeilProps {
  id: string;
  name: string;
  description: string;
  price: number;
  rentalPrice: number;
  images: string[];
  category: string;
  isAvailable?: boolean;
  sku?: string;
  silhouette?: string;
  neckline?: string;
  fabric?: string;
  trainLength?: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Veil {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly rentalPrice: number;
  public readonly images: string[];
  public readonly category: string;
  public readonly isAvailable: boolean;
  public readonly sku?: string;
  public readonly silhouette?: string;
  public readonly neckline?: string;
  public readonly fabric?: string;
  public readonly trainLength?: string;
  public readonly stock?: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: VeilProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.rentalPrice = props.rentalPrice;
    this.images = props.images;
    this.category = props.category;
    this.isAvailable = props.isAvailable ?? true;
    this.sku = props.sku;
    this.silhouette = props.silhouette;
    this.neckline = props.neckline;
    this.fabric = props.fabric;
    this.trainLength = props.trainLength;
    this.stock = props.stock;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
