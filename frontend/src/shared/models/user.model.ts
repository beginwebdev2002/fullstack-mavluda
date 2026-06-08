export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  roles: ('admin' | 'client')[];
  createdAt: Date;
}
