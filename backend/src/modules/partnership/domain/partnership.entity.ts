export class Partnership {
  constructor(
    public readonly id: string,
    public readonly partnerName: string,
    public readonly contactEmail: string,
    public readonly type: string,
    public readonly status: 'active' | 'inactive',
    public readonly createdAt: Date,
  ) {}
}
