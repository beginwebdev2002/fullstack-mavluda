export declare class CreateUserDto {
    telegramId?: number;
    email?: string;
    firstName: string;
    lastName?: string;
    username?: string;
    photoUrl?: string;
    role?: 'user' | 'admin';
    password?: string;
}
