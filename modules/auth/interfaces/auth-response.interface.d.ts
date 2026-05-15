import { User } from '@modules/user';
export interface AuthResponse {
    access_token: string;
    user: Omit<User, 'passwordHash' | 'createdAt'>;
}
export interface TelegramAuthResponse {
    success: boolean;
    user: User;
}
