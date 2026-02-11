export class Veil {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly rentalPrice: number,
    public readonly images: string[],
    public readonly category: string,
    public readonly isAvailable: boolean = true,
    public readonly sku?: string,
    public readonly silhouette?: string,
    public readonly neckline?: string,
    public readonly fabric?: string,
    public readonly trainLength?: string,
    public readonly stock?: number,
    public readonly createdAt: Date = new Date(),
  ) {}
}
