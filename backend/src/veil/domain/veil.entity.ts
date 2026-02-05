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
    public readonly createdAt: Date = new Date(),
  ) {}
}
