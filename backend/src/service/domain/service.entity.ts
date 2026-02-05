export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly durationMinutes: number,
    public readonly category: 'medical' | 'beauty',
    public readonly createdAt: Date = new Date(),
  ) {}
}
