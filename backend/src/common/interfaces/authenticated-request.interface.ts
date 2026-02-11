import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    sub?: string;
    // Add other properties that are attached to the user object by your authentication strategy
  };
}
