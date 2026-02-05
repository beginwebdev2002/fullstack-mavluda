export interface User {
  id: string;
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  roles: ('admin' | 'client')[];
  createdAt: Date;
}
