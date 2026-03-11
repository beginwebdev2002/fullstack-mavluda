export class Treatments {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly duration: number,
    public readonly category: 'medical' | 'beauty',
    public readonly imageUrl: string,
    public readonly active: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}
