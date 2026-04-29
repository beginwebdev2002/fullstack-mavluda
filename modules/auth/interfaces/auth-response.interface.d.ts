import { User } from '@modules/user';
export interface AuthResponse {
    access_token: string;
}
export interface TelegramAuthResponse {
    success: boolean;
    user: User;
}
