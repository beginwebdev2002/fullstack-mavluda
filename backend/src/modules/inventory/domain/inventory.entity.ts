export class Inventory {
  constructor(
    public readonly id: string,
    public readonly itemName: string,
    public readonly quantity: number,
    public readonly location: string,
    public readonly lastUpdated: Date,
  ) {}
}
