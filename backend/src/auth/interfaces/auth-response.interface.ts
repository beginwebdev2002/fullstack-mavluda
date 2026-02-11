import { User } from '@user/domain/user.entity';

export interface AuthResponse {
  access_token: string;
}

export interface TelegramAuthResponse {
  success: boolean;
  user: User;
}
