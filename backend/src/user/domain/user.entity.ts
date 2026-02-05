export class User {
  constructor(
    public readonly id: string,
    public readonly telegramId: number,
    public readonly firstName: string,
    public readonly lastName?: string,
    public readonly username?: string,
    public readonly photoUrl?: string,
    public readonly role: 'user' | 'admin' = 'user',
    public readonly createdAt: Date = new Date(),
  ) {}
}
