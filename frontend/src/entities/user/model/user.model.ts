export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  role: 'user' | 'admin';
  photoUrl?: string;
}

export interface AuthResponse {
  access_token: string;
}
