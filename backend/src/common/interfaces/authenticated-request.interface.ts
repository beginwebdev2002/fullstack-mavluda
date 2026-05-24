import type { Request } from 'express';


export interface AppCookies {
  refreshToken?: string;
}

export interface AuthenticatedRequest extends Request {
  cookies: AppCookies;
  user?: {
    id: string;
    email: string;
    sub?: string;
  };
}
