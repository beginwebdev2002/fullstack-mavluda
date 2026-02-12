export class Booking {
  constructor(
    public readonly id: string,
    public readonly customerName: string,
    public readonly date: Date,
    public readonly status: 'pending' | 'confirmed' | 'cancelled',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
