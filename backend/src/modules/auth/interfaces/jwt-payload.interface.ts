export interface JwtPayload {
  email: string;
  sub: string;
  role: string;
  firstName?: string;
  lastName?: string;
  photoUrl?: string;
}
